    /** @type {import('tailwindcss').Config} */
    export default {
        content: [
          "./index.html",
          "./src/**/*.{js,ts,jsx,tsx}",
        ],
        theme: {
          extend: {
            colors: {
              primary: '#2c3e50',
              secondary: '#E5E7EB',
              textPrimary: '#4B5563',
              textSecondary: '#374151',
              textTertiary: '#6B7280',

              // Colores de Navegación/Header
              "navbar": {
                DEFAULT: "#34495E",
                active: "#3B80F3",
                hover: "#34495E"
              },
              
              "header": {
                DEFAULT: "#34495E",
              },
              "btn-primary": {
                DEFAULT: '#68BA6C',
                hover: '#56a059',
              },
              "btn-secondary": {
                DEFAULT: '#2c3e50',
                hover: '#1c2a38',
              },
              "btn-danger": {
                DEFAULT: '#e74c3c',
                hover: '#c0392b',
              },
            
            }
          },
        },
        plugins: [],
      }
      
  