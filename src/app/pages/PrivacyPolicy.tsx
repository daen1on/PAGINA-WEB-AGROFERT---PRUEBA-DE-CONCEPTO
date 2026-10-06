import { ShieldCheck, FileText, Lock, UserCheck, Mail, Phone, MapPin, ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { useEffect } from "react";

export default function PrivacyPolicy() {
  // Asegurar que la página cargue desde arriba
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Botón Volver */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-green-700 hover:text-green-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Inicio
          </Link>
        </div>

        {/* Encabezado Principal */}
        <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-gray-200 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-green-100 text-green-700 rounded-xl">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-green-700 bg-green-50 px-2.5 py-1 rounded-md">
                Ley 1581 de 2012 &bull; Colombia
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-1">
                Política de Tratamiento de Datos Personales
              </h1>
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            En cumplimiento del Régimen General de Protección de Datos Personales de la República de Colombia
            (Ley 1581 de 2012, Decreto Reglamentario 1377 de 2013 y demás normas concordantes),{" "}
            <strong>AGROFERT</strong> pone a disposición de sus clientes, usuarios y público en general la presente
            política sobre la recolección, almacenamiento, uso y protección de sus datos personales.
          </p>
          <p className="text-xs text-gray-400 mt-4 border-t pt-3">
            Última actualización: Octubre de 2026 &bull; Aplica para el portal web www.agrofert.com.co
          </p>
        </div>

        {/* Secciones de la Política */}
        <div className="space-y-6">
          {/* 1. Responsable del Tratamiento */}
          <section className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-50 text-green-700 rounded-lg">
                <FileText className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">1. Identificación del Responsable del Tratamiento</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 bg-gray-50 p-4 rounded-lg">
              <div>
                <p className="font-semibold text-gray-900">Razón Comercial / Empresa:</p>
                <p>AGROFERT</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Ubicación y Domicilio:</p>
                <p className="flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-4 h-4 text-green-600 flex-shrink-0" />
                  Tuta – Boyacá, Colombia
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Correo Electrónico de Contacto:</p>
                <p className="flex items-center gap-1.5 mt-0.5">
                  <Mail className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <a href="mailto:info@agrofert.com.co" className="text-green-700 hover:underline">
                    info@agrofert.com.co
                  </a>
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Línea Telefónica / WhatsApp:</p>
                <p className="flex items-center gap-1.5 mt-0.5">
                  <Phone className="w-4 h-4 text-green-600 flex-shrink-0" />
                  +57 310 340 6250
                </p>
              </div>
            </div>
          </section>

          {/* 2. Datos Recolectados */}
          <section className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Datos Personales que Recolectamos</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              A través de nuestro formulario de contacto, canales de mensajería y navegación, recolectamos datos de
              contacto indispensables para interactuar con nuestros usuarios:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 bg-green-50/50 p-4 rounded-lg border border-green-100">
              <li><strong>Datos de contacto e identificación:</strong> Nombre completo, correo electrónico y número telefónico.</li>
              <li><strong>Datos de la solicitud:</strong> Asunto de consulta, tipo de cultivo o producto de interés y contenido del mensaje.</li>
              <li><strong>Datos técnicos no sensibles:</strong> Dirección IP del remitente para fines de seguridad y control anti-spam.</li>
            </ul>
            <p className="text-xs text-gray-500 mt-3">
              <em>Nota:</em> AGROFERT <strong>no</strong> solicita ni almacena datos sensibles (como origen racial,
              orientación política, datos biométricos o de salud) ni información de tarjetas de crédito directamente en este portal.
            </p>
          </section>

          {/* 3. Finalidades del Tratamiento */}
          <section className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Finalidades del Tratamiento de Datos</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Los datos personales suministrados voluntariamente por el usuario serán utilizados exclusiva y
              legítimamente para:
            </p>
            <div className="space-y-2.5 text-sm text-gray-700">
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0"></span>
                <p>Responder oportunamente a solicitudes de información, cotizaciones de fertilizantes y asesorías técnicas agrícolas.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0"></span>
                <p>Gestionar la relación comercial y de distribución con productores, agricultores y distribuidores autorizados.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0"></span>
                <p>Enviar fichas técnicas de productos, planes de fertilización y recomendaciones de aplicación cuando sea solicitado.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0"></span>
                <p>Cumplir con las obligaciones legales, contables y regulatorias aplicables en Colombia.</p>
              </div>
            </div>
          </section>

          {/* 4. Derechos de los Titulares (Habeas Data) */}
          <section className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-50 text-green-700 rounded-lg">
                <UserCheck className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">4. Derechos del Titular de la Información (Derechos ARCO)</h2>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              De conformidad con el artículo 8 de la Ley 1581 de 2012, usted como titular de sus datos personales tiene
              derecho a:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="p-3.5 bg-gray-50 rounded-lg border border-gray-100">
                <p className="font-semibold text-gray-900 mb-1">Conocer y Acceder</p>
                <p className="text-gray-600 text-xs">Conocer los datos personales que reposan en las bases de datos de AGROFERT de forma gratuita.</p>
              </div>
              <div className="p-3.5 bg-gray-50 rounded-lg border border-gray-100">
                <p className="font-semibold text-gray-900 mb-1">Actualizar y Rectificar</p>
                <p className="text-gray-600 text-xs">Solicitar la corrección de datos inexactos, incompletos o desactualizados.</p>
              </div>
              <div className="p-3.5 bg-gray-50 rounded-lg border border-gray-100">
                <p className="font-semibold text-gray-900 mb-1">Suprimir / Eliminar</p>
                <p className="text-gray-600 text-xs">Solicitar la eliminación total de sus datos cuando no exista un deber legal o contractual de conservarlos.</p>
              </div>
              <div className="p-3.5 bg-gray-50 rounded-lg border border-gray-100">
                <p className="font-semibold text-gray-900 mb-1">Revocar la Autorización</p>
                <p className="text-gray-600 text-xs">Revocar en cualquier momento el consentimiento otorgado para el tratamiento de su información.</p>
              </div>
            </div>
          </section>

          {/* 5. Procedimiento para Ejercer sus Derechos */}
          <section className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Canales para Ejercer sus Derechos</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Para ejercer cualquiera de sus derechos de Habeas Data, puede remitir una solicitud formal a través de:
            </p>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-sm text-gray-800">
              <p className="font-semibold text-green-900">Correo Electrónico Oficial:</p>
              <p className="text-green-800 mb-2">
                <a href="mailto:info@agrofert.com.co?subject=Solicitud%20Habeas%20Data" className="underline font-medium">
                  info@agrofert.com.co
                </a>{" "}
                (Asunto: <em>"Ejercicio Derechos Habeas Data"</em>)
              </p>
              <p className="text-xs text-gray-600">
                <strong>Plazo de Respuesta:</strong> Conforme al artículo 15 de la Ley 1581 de 2012, las consultas serán
                atendidas en un término máximo de <strong>diez (10) días hábiles</strong> y los reclamos en un término
                máximo de <strong>quince (15) días hábiles</strong>.
              </p>
            </div>
          </section>

          {/* 6. Seguridad y Almacenamiento */}
          <section className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-50 text-green-700 rounded-lg">
                <Lock className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">6. Seguridad de la Información</h2>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              AGROFERT implementa medidas técnicas, humanas y administrativas de seguridad (incluyendo conexiones cifradas
              SSL/TLS, protección contra inyección de código y controles de acceso restringido) para evitar la
              adulteración, pérdida, consulta, uso o acceso no autorizado o fraudulento de la información.
            </p>
          </section>

          {/* 7. Política de Cookies */}
          <section className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Uso de Cookies y Tecnologías Similares</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              Este sitio web utiliza exclusivamente <strong>cookies técnicas esenciales</strong> que resultan estrictamente
              necesarias para el correcto funcionamiento de la interfaz de usuario (como recordar preferencias de
              navegación en la sesión).
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              AGROFERT <strong>no</strong> comercializa datos de navegación ni utiliza cookies de perfilamiento publicitario
              invasivo de terceros. Usted puede configurar o desactivar las cookies en cualquier momento desde las
              opciones de configuración de su navegador web.
            </p>
          </section>

          {/* 8. Vigencia */}
          <section className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-2">8. Vigencia y Modificaciones</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              La presente Política rige a partir de su publicación en el sitio web. Las bases de datos se mantendrán
              vigentes mientras sea necesario para la atención de las finalidades comerciales y legales antes descritas.
              Cualquier cambio sustancial será publicado en esta misma sección.
            </p>
          </section>
        </div>

        {/* Pie de página de la Política */}
        <div className="mt-10 text-center">
          <Link
            to="/contacto"
            className="inline-flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors shadow-sm"
          >
            Ir al Formulario de Contacto
          </Link>
        </div>
      </div>
    </div>
  );
}
