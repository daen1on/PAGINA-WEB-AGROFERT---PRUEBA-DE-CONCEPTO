import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

/**
 * Procesa y envía el correo electrónico del formulario de contacto usando SMTP.
 * @param {Object} reqBody - Datos recibidos del formulario { name, email, phone, subject, message }
 * @param {Object} passedEnv - Variables de entorno cargadas
 * @returns {Promise<{ statusCode: number, data: Object }>}
 */
export async function handleSendEmail(reqBody, passedEnv = {}) {
  const { name, email, phone, subject, message } = reqBody || {};

  // Leer .env directamente con dotenv.parse para evitar que caracteres especiales como $ sean expandidos
  let env = { ...passedEnv };
  try {
    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const rawEnv = dotenv.parse(fs.readFileSync(envPath));
      env = { ...env, ...rawEnv };
    }
  } catch (e) {
    // Si falla la lectura directa, continuar con passedEnv
  }

  // Validaciones básicas de campos obligatorios
  if (!name || !name.trim()) {
    return {
      statusCode: 400,
      data: { error: 'Por favor ingresa tu nombre completo.' },
    };
  }

  if (!email || !email.trim()) {
    return {
      statusCode: 400,
      data: { error: 'Por favor ingresa tu correo electrónico.' },
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return {
      statusCode: 400,
      data: { error: 'El formato del correo electrónico ingresado no es válido.' },
    };
  }

  if (!message || !message.trim()) {
    return {
      statusCode: 400,
      data: { error: 'Por favor escribe un mensaje.' },
    };
  }

  // Obtener configuración desde variables de entorno (con soporte para prefijos VITE_ o estándar)
  const host = env.SMTP_HOST || env.VITE_SMTP_HOST || process.env.SMTP_HOST || 'mail.agrofert.com.co';
  const port = parseInt(env.SMTP_PORT || env.VITE_SMTP_PORT || process.env.SMTP_PORT || '465', 10);
  const secureEnv = env.SMTP_SECURE || env.VITE_SMTP_SECURE || process.env.SMTP_SECURE;
  const secure = secureEnv !== undefined ? String(secureEnv).toLowerCase() === 'true' : port === 465;
  const user = env.SMTP_USER || env.VITE_SMTP_USER || process.env.SMTP_USER || 'info@agrofert.com.co';
  const pass = env.SMTP_PASS || env.VITE_SMTP_PASS || process.env.SMTP_PASS || '';
  const to = env.MAIL_TO || env.VITE_MAIL_TO || process.env.MAIL_TO || user;
  const fromName = env.MAIL_FROM_NAME || env.VITE_MAIL_FROM_NAME || process.env.MAIL_FROM_NAME || 'Agrofert Web';

  // Si no se ha configurado la contraseña en .env
  if (!pass || pass.trim() === '') {
    return {
      statusCode: 500,
      data: {
        error: 'La contraseña del correo (SMTP_PASS) no está configurada en el archivo .env. Por favor asígnala para habilitar el envío.',
      },
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure, // true para puerto 465 (SSL), false para 587 (TLS/STARTTLS)
      auth: {
        user,
        pass,
      },
      tls: {
        // Evita errores de certificados autofirmados o no coincidentes comunes en cPanel
        rejectUnauthorized: false,
      },
      connectionTimeout: 10000, // 10 segundos
    });

    const subjectText = subject
      ? `[Contacto Web] ${subject} - ${name.trim()}`
      : `[Contacto Web] Mensaje de ${name.trim()}`;

    const textContent = `
Se ha recibido un nuevo mensaje desde el formulario de contacto de agrofert.com.co:

--------------------------------------------------
Nombre: ${name.trim()}
Correo: ${email.trim()}
Teléfono: ${phone ? phone.trim() : 'No especificado'}
Asunto: ${subject ? subject.trim() : 'No especificado'}
--------------------------------------------------

Mensaje:
${message.trim()}

--------------------------------------------------
Puedes responder directamente a este correo para escribirle a ${email.trim()}.
    `.trim();

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nuevo Mensaje de Contacto</title>
      </head>
      <body style="margin: 0; padding: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f3f4f6; color: #374151;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); border: 1px solid #e5e7eb;">
          <tr>
            <td style="background: linear-gradient(135deg, #166534 0%, #15803d 100%); padding: 30px 24px; text-align: center; color: #ffffff;">
              <h1 style="margin: 0; font-size: 26px; font-weight: 700; letter-spacing: 1px;">AGROFERT</h1>
              <p style="margin: 6px 0 0; font-size: 15px; opacity: 0.95;">Nuevo Mensaje del Formulario de Contacto</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 28px 24px;">
              <p style="margin: 0 0 16px; font-size: 15px; color: #4b5563;">Has recibido un mensaje a través del sitio web:</p>

              <table width="100%" cellpadding="8" cellspacing="0" style="margin-bottom: 24px; font-size: 14px; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid #f3f4f6;">
                  <td style="font-weight: 600; color: #6b7280; width: 110px;">Nombre:</td>
                  <td style="font-weight: 500; color: #111827;">${name.trim()}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f3f4f6;">
                  <td style="font-weight: 600; color: #6b7280;">Email:</td>
                  <td>
                    <a href="mailto:${email.trim()}" style="color: #16a34a; font-weight: 500; text-decoration: none;">
                      ${email.trim()}
                    </a>
                  </td>
                </tr>
                <tr style="border-bottom: 1px solid #f3f4f6;">
                  <td style="font-weight: 600; color: #6b7280;">Teléfono:</td>
                  <td style="color: #111827;">${phone ? phone.trim() : '<span style="color: #9ca3af;">No especificado</span>'}</td>
                </tr>
                <tr>
                  <td style="font-weight: 600; color: #6b7280;">Asunto:</td>
                  <td style="color: #111827;">${subject ? subject.trim() : '<span style="color: #9ca3af;">General</span>'}</td>
                </tr>
              </table>

              <div style="background-color: #f8fafc; border-left: 4px solid #16a34a; border-radius: 4px; padding: 18px; margin-top: 10px;">
                <h4 style="margin: 0 0 8px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; color: #15803d;">Mensaje:</h4>
                <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #334155; white-space: pre-wrap;">${message.trim()}</p>
              </div>

              <div style="margin-top: 24px; text-align: center;">
                <a href="mailto:${email.trim()}" style="display: inline-block; background-color: #16a34a; color: #ffffff; text-decoration: none; padding: 10px 22px; border-radius: 6px; font-weight: 600; font-size: 14px;">
                  Responder al remitente
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f9fafb; padding: 16px 24px; text-align: center; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
              Enviado automáticamente desde <a href="https://agrofert.com.co" style="color: #16a34a; text-decoration: none;">agrofert.com.co</a>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: `"${fromName}" <${user}>`,
      replyTo: `"${name.trim()}" <${email.trim()}>`,
      to,
      subject: subjectText,
      text: textContent,
      html: htmlContent,
    });

    return {
      statusCode: 200,
      data: {
        success: true,
        message: '¡Tu mensaje ha sido enviado correctamente! Nos pondremos en contacto pronto.',
      },
    };
  } catch (err) {
    console.error('Error al enviar correo vía SMTP:', err);
    let userFriendlyMessage = err.message || 'Error de conexión con el servidor SMTP.';
    if (err.code === 'EAUTH' || (err.message && err.message.includes('535'))) {
      userFriendlyMessage = 'Error de autenticación SMTP (535): La contraseña o el usuario de correo configurados en .env no coinciden. Por favor revisa la contraseña de tu cuenta info@agrofert.com.co en el archivo .env.';
    } else if (err.code === 'ESOCKET' || err.code === 'ETIMEDOUT' || err.code === 'ECONNREFUSED') {
      userFriendlyMessage = `No se pudo conectar al servidor de correo (${host}:${port}). Verifica el servidor o el puerto SMTP en .env.`;
    }

    return {
      statusCode: 500,
      data: {
        error: userFriendlyMessage,
        details: err.message,
      },
    };
  }
}
