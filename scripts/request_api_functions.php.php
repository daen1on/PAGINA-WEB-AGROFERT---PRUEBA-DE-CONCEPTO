add_action('rest_api_init', function () {
    register_rest_route('agrofert/v1', '/products', [
        'methods'             => 'GET',
        'callback'            => 'agrofert_get_custom_products',
        'permission_callback' => '__return_true',
    ]);
});

function agrofert_get_custom_products($request) {
    // Verificar si WooCommerce está activo para evitar fatales
    if (!function_exists('wc_get_products')) {
        return new WP_Error('wc_missing', 'WooCommerce no está activo', ['status' => 500]);
    }

    $per_page = $request->get_param('per_page') ? intval($request->get_param('per_page')) : 100;

    $args = [
        'status' => 'publish',
        'limit'  => $per_page,
    ];

    $products = wc_get_products($args);
    $data = [];

    foreach ($products as $product) {
        if (!$product) continue;

        $product_id = $product->get_id();

        // 1. Categorías
        $terms_cat = get_the_terms($product_id, 'product_cat');
        $categories = [];
        if (!empty($terms_cat) && !is_wp_error($terms_cat)) {
            foreach ($terms_cat as $term) {
                $categories[] = [
                    'id'   => $term->term_id,
                    'name' => $term->name,
                    'slug' => $term->slug,
                ];
            }
        }

        // 2. Etiquetas (Tags)
        $terms_tag = get_the_terms($product_id, 'product_tag');
        $tags = [];
        if (!empty($terms_tag) && !is_wp_error($terms_tag)) {
            foreach ($terms_tag as $term) {
                $tags[] = [
                    'id'   => $term->term_id,
                    'name' => $term->name,
                    'slug' => $term->slug,
                ];
            }
        }

        // 3. Imágenes (Controlando URLs válidas)
        $images = [];
        $main_image_id = $product->get_image_id();
        if (!empty($main_image_id)) {
            $main_url = wp_get_attachment_url($main_image_id);
            if ($main_url) {
                $images[] = ['src' => $main_url];
            }
        }

        $gallery_ids = $product->get_gallery_image_ids();
        if (!empty($gallery_ids) && is_array($gallery_ids)) {
            foreach ($gallery_ids as $gallery_id) {
                $gallery_url = wp_get_attachment_url($gallery_id);
                if ($gallery_url) {
                    $images[] = ['src' => $gallery_url];
                }
            }
        }

        // 4. Atributos formateados (Evita el error fatal de serialización de objetos PHP)
        $formatted_attributes = [];
        $raw_attributes = $product->get_attributes();
        if (!empty($raw_attributes)) {
            foreach ($raw_attributes as $attr_key => $attr_val) {
                if (is_object($attr_val) && method_exists($attr_val, 'get_data')) {
                    $formatted_attributes[] = $attr_val->get_data();
                } elseif (is_array($attr_val)) {
                    $formatted_attributes[] = $attr_val;
                }
            }
        }

        $data[] = [
            'id'                => $product_id,
            'name'              => $product->get_name(),
            'description'       => wpautop($product->get_description() ?: ''),
            'short_description' => wpautop($product->get_short_description() ?: ''),
            'images'            => $images,
            'categories'        => $categories,
            'tags'              => $tags,
            'attributes'        => $formatted_attributes,
        ];
    }

    return rest_ensure_response($data);
}