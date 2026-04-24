/**
 * Spanish Tool Content / Contenido de Herramientas en EspaÃ±ol
 * Requirements: 3.1 - Multi-language support
 * 
 * Contains detailed descriptions, how-to steps, use cases, and FAQs for all 67 tools
 */

import type { ToolContent } from '@/types/tool';

/**
 * Spanish tool content map
 * Each tool has: title, metaDescription, keywords, description, howToUse (3+ steps), useCases (3+ scenarios), faq (3+ questions)
 */
export const toolContentEs: Record<string, ToolContent> = {
  // ==================== HERRAMIENTAS POPULARES ====================
  'pdf-multi-tool': {
    title: 'Herramienta MÃºltiple PDF',
    metaDescription: 'Editor PDF todo en uno: combina, divide, organiza, elimina, rota y extrae pÃ¡ginas en una sola herramienta.',
    description: '<p>La Herramienta MÃºltiple PDF es tu soluciÃ³n integral para todas las tareas de gestiÃ³n de pÃ¡ginas PDF. Combina mÃºltiples operaciones en una Ãºnica interfaz intuitiva.</p><p>Todo el procesamiento ocurre en tu navegador, asegurando privacidad completa.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta tu archivo PDF o haz clic para seleccionar.' },
      { step: 2, title: 'Elige la OperaciÃ³n', description: 'Selecciona entre combinar, dividir, organizar, eliminar, rotar o extraer pÃ¡ginas.' },
      { step: 3, title: 'Procesa y Descarga', description: 'Haz clic en procesar y descarga tu PDF modificado.' },
    ],
    useCases: [
      { title: 'PreparaciÃ³n de Documentos', description: 'Prepara documentos eliminando pÃ¡ginas innecesarias y reordenando contenido.', icon: 'file-check' },
      { title: 'Ensamblaje de Informes', description: 'Combina secciones de informes en un Ãºnico documento profesional.', icon: 'book-open' },
      { title: 'GestiÃ³n de Archivos', description: 'Divide archivos grandes y extrae pÃ¡ginas relevantes.', icon: 'archive' },
    ],
    faq: [
      { question: 'Â¿CuÃ¡ntos PDFs puedo procesar?', answer: 'Puedes procesar hasta 10 archivos PDF simultÃ¡neamente, con un tamaÃ±o mÃ¡ximo de 500MB.' },
      { question: 'Â¿Se conservan los marcadores?', answer: 'SÃ­, al combinar PDFs se conservan los marcadores existentes.' },
      { question: 'Â¿Hay lÃ­mite de pÃ¡ginas?', answer: 'No hay lÃ­mite estricto. La herramienta maneja documentos con cientos de pÃ¡ginas.' },
    ],
  },

  'merge-pdf': {
    title: 'Combinar PDF',
    metaDescription: 'Combina mÃºltiples archivos PDF en un solo documento. Combinador de PDF gratuito con reordenamiento.',
    description: '<p>Combinar PDF te permite unir mÃºltiples documentos PDF en un solo archivo. Sube tus archivos, ordÃ©nalos y combÃ­nalos en un documento cohesivo.</p><p>Todo ocurre localmente en tu navegador para mÃ¡xima privacidad.</p>',
    howToUse: [
      { step: 1, title: 'Sube Archivos PDF', description: 'Arrastra y suelta mÃºltiples archivos PDF o haz clic para seleccionar.' },
      { step: 2, title: 'Ordena los Archivos', description: 'Arrastra las miniaturas para ordenarlos como desees.' },
      { step: 3, title: 'Combina y Descarga', description: 'Haz clic en Combinar y descarga tu PDF unificado.' },
    ],
    useCases: [
      { title: 'Combinar Informes', description: 'Une informes mensuales en un documento anual.', icon: 'file-text' },
      { title: 'Crear Portafolios', description: 'Combina documentos de proyectos en un portafolio profesional.', icon: 'briefcase' },
      { title: 'Consolidar Facturas', description: 'Une facturas para propÃ³sitos contables.', icon: 'receipt' },
    ],
    faq: [
      { question: 'Â¿CuÃ¡ntos PDFs puedo combinar?', answer: 'Hasta 100 archivos PDF con un tamaÃ±o total de 500MB.' },
      { question: 'Â¿Se mantiene la calidad?', answer: 'SÃ­, se preserva la calidad original sin compresiÃ³n.' },
      { question: 'Â¿Puedo combinar PDFs protegidos?', answer: 'Necesitas descifrarlos primero con nuestra herramienta Descifrar PDF.' },
    ],
  },

  'rotate-custom': {
    title: 'Rotar por Grados Personalizados',
    metaDescription: 'Rota pÃ¡ginas PDF en cualquier Ã¡ngulo. RotaciÃ³n precisa para enderezar documentos escaneados.',
    description: '<p>Rotar por Grados Personalizados te da control preciso sobre la orientaciÃ³n de tus pÃ¡ginas PDF. A diferencia de las herramientas estÃ¡ndar que solo rotan en incrementos de 90 grados, esta herramienta te permite rotar pÃ¡ginas en cualquier Ã¡ngulo especÃ­fico.</p><p>Perfecto para enderezar documentos escaneados torcidos o ajustar diagramas. Puedes corregir pÃ¡ginas individuales o aplicar la misma rotaciÃ³n a todo el documento.</p><p>Todo el procesamiento ocurre localmente en tu navegador, asegurando privacidad total mientras logras una alineaciÃ³n perfecta.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Sube el archivo PDF con las pÃ¡ginas que necesitas rotar.' },
      { step: 2, title: 'Establece el Ãngulo', description: 'Ingresa el grado exacto de rotaciÃ³n para cada pÃ¡gina, o un Ã¡ngulo para todas.' },
      { step: 3, title: 'Vista Previa y Ajuste', description: 'Usa la vista previa en tiempo real para asegurar una alineaciÃ³n perfecta.' },
      { step: 4, title: 'Aplica y Descarga', description: 'Haz clic en Rotar para aplicar los cambios y descargar tu PDF enderezado.' },
    ],
    useCases: [
      { title: 'Documentos Escaneados', description: 'Endereza pÃ¡ginas escaneadas que quedaron torcidas.', icon: 'scan' },
      { title: 'Dibujos TÃ©cnicos', description: 'Ajusta la orientaciÃ³n de planos y diagramas con precisiÃ³n.', icon: 'ruler' },
      { title: 'DiseÃ±os Creativos', description: 'Crea diseÃ±os Ãºnicos rotando pÃ¡ginas en Ã¡ngulos artÃ­sticos.', icon: 'pen-tool' },
    ],
    faq: [
      { question: 'Â¿Puedo rotar con decimales?', answer: 'Actualmente soporta grados enteros, pero estamos trabajando en precisiÃ³n decimal.' },
      { question: 'Â¿Afecta el contenido?', answer: 'El contenido se rota visualmente. El tamaÃ±o de pÃ¡gina se ajusta automÃ¡ticamente.' },
      { question: 'Â¿Puedo rotar solo una pÃ¡gina?', answer: 'SÃ­, puedes establecer un Ã¡ngulo personalizado para cualquier pÃ¡gina individual.' },
    ],
  },

  'grid-combine': {
    title: 'Combinar en CuadrÃ­cula PDF',
    metaDescription: 'Combinar mÃºltiples archivos PDF en pÃ¡ginas individuales con un diseÃ±o de cuadrÃ­cula flexible. Organice 2, 4, 6, 9 o mÃ¡s PDF por pÃ¡gina con bordes y espaciado.',
    description: `
      <p>La herramienta Combinar en CuadrÃ­cula ofrece una forma Ãºnica de fusionar mÃºltiples archivos PDF separados en pÃ¡ginas individuales. A diferencia de la herramienta estÃ¡ndar "Fusionar PDF" que simplemente aÃ±ade pÃ¡ginas, o la herramienta "N-Up" que reorganiza pÃ¡ginas de un solo documento, Combinar en CuadrÃ­cula toma mÃºltiples archivos de entrada y los organiza uno al lado del otro en un diseÃ±o de cuadrÃ­cula personalizable.</p>
      <p>Puede elegir entre varias configuraciones de cuadrÃ­cula como 2x1, 2x2, 3x3, etc. Esto es perfecto para comparar mÃºltiples documentos, crear folletos de diferentes fuentes o imprimir versiones compactas de varios archivos.</p>
      <p>Personalice la salida controlando el tamaÃ±o de pÃ¡gina, la orientaciÃ³n, los mÃ¡rgenes, el espaciado y los bordes. Todo el procesamiento ocurre localmente en su navegador para mÃ¡xima privacidad.</p>
    `,
    howToUse: [
      { step: 1, title: 'Subir Archivos PDF', description: 'Suba dos o mÃ¡s archivos PDF que desee combinar. Puede reorganizarlos en el orden deseado.' },
      { step: 2, title: 'Elegir DiseÃ±o de CuadrÃ­cula', description: 'Seleccione el diseÃ±o de cuadrÃ­cula deseado (ej: 2x2 para 4 archivos por pÃ¡gina, 3x3 para 9 archivos por pÃ¡gina).' },
      { step: 3, title: 'Personalizar Apariencia', description: 'Ajuste configuraciones como tamaÃ±o de pÃ¡gina (A4, Carta), orientaciÃ³n, espaciado entre elementos y bordes.' },
      { step: 4, title: 'Combinar y Descargar', description: 'Haga clic en "Combinar PDFs" para generar su nuevo documento con diseÃ±o de cuadrÃ­cula y descargue el resultado.' },
    ],
    useCases: [
      { title: 'ComparaciÃ³n Visual', description: 'Coloque diferentes versiones de un diseÃ±o o documento una al lado de la otra en una sola pÃ¡gina para una fÃ¡cil comparaciÃ³n.', icon: 'layout-grid' },
      { title: 'Imprimir Folletos', description: 'Combine mÃºltiples documentos cortos o diapositivas en una sola hoja para ahorrar costos de impresiÃ³n.', icon: 'printer' },
      { title: 'CreaciÃ³n de Portafolios', description: 'Muestre mÃºltiples archivos de proyecto en una vista general de cuadrÃ­cula limpia y organizada.', icon: 'image' },
    ],
    faq: [
      { question: 'Â¿En quÃ© se diferencia de N-Up?', answer: 'N-Up toma pÃ¡ginas de UN PDF y las pone en una hoja. Combinar en CuadrÃ­cula toma MÃšLTIPLES ARCHIVOS PDF DIFERENTES y los pone en una hoja.' },
      { question: 'Â¿CuÃ¡ntos archivos puedo combinar?', answer: 'Puede combinar hasta 100 archivos dependiendo de la memoria de su navegador, pero los diseÃ±os como 4x4 acomodan hasta 16 archivos por pÃ¡gina.' },
      { question: 'Â¿Puedo aÃ±adir bordes?', answer: 'SÃ­, puede aÃ±adir bordes alrededor de cada archivo PDF y personalizar el color del borde.' },
    ],
  },

  'split-pdf': {
    title: 'Dividir PDF',
    metaDescription: 'Divide archivos PDF en mÃºltiples documentos. Extrae pÃ¡ginas especÃ­ficas o divide por rangos.',
    description: '<p>Dividir PDF te permite separar un documento PDF en mÃºltiples archivos. Perfecto para extraer capÃ­tulos o crear archivos individuales.</p><p>Procesamiento local para mÃ¡xima seguridad.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta o selecciona el archivo a dividir.' },
      { step: 2, title: 'Define los Rangos', description: 'Ingresa los nÃºmeros de pÃ¡gina o rangos (ej: 1-5, 8, 10-15).' },
      { step: 3, title: 'Divide y Descarga', description: 'Haz clic en Dividir y descarga los archivos resultantes.' },
    ],
    useCases: [
      { title: 'Extraer CapÃ­tulos', description: 'Divide libros en capÃ­tulos individuales.', icon: 'book' },
      { title: 'Separar Escaneos', description: 'Divide documentos escaneados en archivos individuales.', icon: 'copy' },
      { title: 'Crear Material', description: 'Extrae pÃ¡ginas especÃ­ficas para material de apoyo.', icon: 'presentation' },
    ],
    faq: [
      { question: 'Â¿Puedo dividir en pÃ¡ginas individuales?', answer: 'SÃ­, selecciona "Dividir cada pÃ¡gina" para crear archivos de una pÃ¡gina.' },
      { question: 'Â¿QuÃ© pasa con los marcadores?', answer: 'Los marcadores dentro del rango extraÃ­do se conservan.' },
      { question: 'Â¿Puedo dividir PDFs protegidos?', answer: 'Primero descifra el PDF con nuestra herramienta Descifrar PDF.' },
    ],
  },

  'compress-pdf': {
    title: 'Comprimir PDF',
    metaDescription: 'Reduce el tamaÃ±o de archivos PDF manteniendo la calidad. Compresor de PDF gratuito.',
    description: '<p>Comprimir PDF reduce el tamaÃ±o de tus documentos manteniendo calidad aceptable. Ideal para correos electrÃ³nicos y almacenamiento.</p><p>CompresiÃ³n local en tu navegador.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta o selecciona el documento a comprimir.' },
      { step: 2, title: 'Elige el Nivel', description: 'Selecciona: Bajo (mejor calidad), Medio o Alto (menor tamaÃ±o).' },
      { step: 3, title: 'Comprime y Descarga', description: 'Haz clic en Comprimir y descarga el PDF optimizado.' },
    ],
    useCases: [
      { title: 'Adjuntos de Correo', description: 'Reduce el tamaÃ±o para cumplir lÃ­mites de correo.', icon: 'mail' },
      { title: 'PublicaciÃ³n Web', description: 'Optimiza PDFs para descarga web rÃ¡pida.', icon: 'globe' },
      { title: 'Ahorro de Espacio', description: 'Comprime documentos archivados.', icon: 'hard-drive' },
    ],
    faq: [
      { question: 'Â¿CuÃ¡nto puedo reducir?', answer: 'PDFs con imÃ¡genes pueden reducirse 50-80%. Solo texto tiene menor reducciÃ³n.' },
      { question: 'Â¿Afecta la calidad del texto?', answer: 'No, el texto permanece nÃ­tido. Solo las imÃ¡genes se comprimen.' },
      { question: 'Â¿Puedo comprimir varios PDFs?', answer: 'SÃ­, hasta 10 archivos simultÃ¡neamente.' },
    ],
  },

  'edit-pdf': {
    title: 'Editar PDF',
    metaDescription: 'Edita archivos PDF en lÃ­nea. AÃ±ade texto, imÃ¡genes, anotaciones y formas.',
    description: '<p>Editar PDF proporciona herramientas completas para modificar y anotar documentos. AÃ±ade texto, imÃ¡genes, formas y comentarios.</p><p>EdiciÃ³n local para privacidad total.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta o selecciona el documento a editar.' },
      { step: 2, title: 'Selecciona Herramienta', description: 'Elige: texto, resaltado, formas, imÃ¡genes o comentarios.' },
      { step: 3, title: 'Guarda y Descarga', description: 'Aplica los cambios y descarga el PDF editado.' },
    ],
    useCases: [
      { title: 'RevisiÃ³n de Documentos', description: 'AÃ±ade comentarios y marcas para revisiÃ³n colaborativa.', icon: 'message-square' },
      { title: 'Completar Formularios', description: 'Rellena campos y aÃ±ade firmas sin imprimir.', icon: 'edit-3' },
      { title: 'RedacciÃ³n', description: 'Elimina informaciÃ³n sensible antes de compartir.', icon: 'eye-off' },
    ],
    faq: [
      { question: 'Â¿Puedo editar texto original?', answer: 'Esta herramienta aÃ±ade anotaciones. Para editar texto existente, usa el documento fuente.' },
      { question: 'Â¿Las ediciones son permanentes?', answer: 'Puedes aplanarlas para hacerlas permanentes o mantenerlas editables.' },
      { question: 'Â¿Hay funciÃ³n deshacer?', answer: 'SÃ­, soporta deshacer/rehacer y restablecer al original.' },
    ],
  },

  'jpg-to-pdf': {
    title: 'JPG a PDF',
    metaDescription: 'Convierte imÃ¡genes JPG a PDF. Combina mÃºltiples JPG en un documento PDF.',
    description: '<p>JPG a PDF convierte tus imÃ¡genes JPEG en documentos PDF. Combina mÃºltiples imÃ¡genes en un Ãºnico PDF profesional.</p><p>ConversiÃ³n local para privacidad.</p>',
    howToUse: [
      { step: 1, title: 'Sube ImÃ¡genes', description: 'Arrastra y suelta archivos JPG o haz clic para seleccionar.' },
      { step: 2, title: 'Ordena y Configura', description: 'Reordena imÃ¡genes y selecciona tamaÃ±o de pÃ¡gina.' },
      { step: 3, title: 'Convierte y Descarga', description: 'Haz clic en Convertir y descarga el PDF.' },
    ],
    useCases: [
      { title: 'Ãlbumes de Fotos', description: 'Crea Ã¡lbumes PDF de fotos para compartir.', icon: 'image' },
      { title: 'Escaneo de Documentos', description: 'Convierte fotos de documentos en PDFs.', icon: 'camera' },
      { title: 'Portafolios', description: 'Compila trabajos fotogrÃ¡ficos en un portafolio.', icon: 'folder' },
    ],
    faq: [
      { question: 'Â¿CuÃ¡ntas imÃ¡genes puedo convertir?', answer: 'Hasta 100 imÃ¡genes JPG en un Ãºnico PDF.' },
      { question: 'Â¿Se preserva la calidad?', answer: 'SÃ­, las imÃ¡genes se incrustan en calidad original.' },
      { question: 'Â¿Puedo establecer diferentes tamaÃ±os?', answer: 'Se aplica un tamaÃ±o uniforme. Las imÃ¡genes se escalan manteniendo proporciÃ³n.' },
    ],
  },

  'sign-pdf': {
    title: 'Firmar PDF',
    metaDescription: 'AÃ±ade firmas electrÃ³nicas a documentos PDF. Dibuja, escribe o sube tu firma.',
    description: '<p>Firmar PDF te permite aÃ±adir firmas electrÃ³nicas a tus documentos. Crea tu firma dibujando, escribiendo o subiendo una imagen.</p><p>Firma local para seguridad.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta o selecciona el documento a firmar.' },
      { step: 2, title: 'Crea tu Firma', description: 'Dibuja, escribe o sube una imagen de firma.' },
      { step: 3, title: 'Coloca y Descarga', description: 'Posiciona la firma y descarga el PDF firmado.' },
    ],
    useCases: [
      { title: 'Firma de Contratos', description: 'Firma contratos electrÃ³nicamente sin imprimir.', icon: 'file-signature' },
      { title: 'Completar Formularios', description: 'AÃ±ade firma a formularios y documentos oficiales.', icon: 'clipboard' },
      { title: 'Aprobaciones', description: 'Firma documentos en procesos de aprobaciÃ³n.', icon: 'check-circle' },
    ],
    faq: [
      { question: 'Â¿Es legalmente vinculante?', answer: 'Las firmas electrÃ³nicas son reconocidas en la mayorÃ­a de paÃ­ses. Consulta regulaciones locales.' },
      { question: 'Â¿Puedo guardar mi firma?', answer: 'SÃ­, se guarda en el almacenamiento local del navegador.' },
      { question: 'Â¿Puedo aÃ±adir mÃºltiples firmas?', answer: 'SÃ­, aÃ±ade tantas firmas como necesites en cualquier pÃ¡gina.' },
    ],
  },

  'crop-pdf': {
    title: 'Recortar PDF',
    metaDescription: 'Recorta pÃ¡ginas PDF para eliminar mÃ¡rgenes y Ã¡reas no deseadas.',
    description: '<p>Recortar PDF elimina mÃ¡rgenes y Ã¡reas no deseadas de tus pÃ¡ginas. Ãštil para eliminar espacios en blanco o estandarizar dimensiones.</p><p>Procesamiento local.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta o selecciona el documento a recortar.' },
      { step: 2, title: 'Define el Ãrea', description: 'Arrastra los controles o ingresa medidas precisas.' },
      { step: 3, title: 'Recorta y Descarga', description: 'Aplica el recorte y descarga el PDF.' },
    ],
    useCases: [
      { title: 'Eliminar MÃ¡rgenes', description: 'Recorta mÃ¡rgenes excesivos de documentos escaneados.', icon: 'maximize-2' },
      { title: 'Enfocar Contenido', description: 'Recorta para resaltar Ã¡reas especÃ­ficas.', icon: 'target' },
      { title: 'Estandarizar PÃ¡ginas', description: 'Haz que todas las pÃ¡ginas tengan el mismo tamaÃ±o.', icon: 'square' },
    ],
    faq: [
      { question: 'Â¿El recorte es permanente?', answer: 'SÃ­, el contenido fuera del Ã¡rea se elimina. Guarda una copia de seguridad.' },
      { question: 'Â¿Puedo recortar pÃ¡ginas diferentes?', answer: 'SÃ­, puedes aplicar diferentes configuraciones a cada pÃ¡gina.' },
      { question: 'Â¿Afecta la calidad del texto?', answer: 'No, el contenido restante mantiene su calidad original.' },
    ],
  },

  'extract-pages': {
    title: 'Extraer PÃ¡ginas',
    metaDescription: 'Extrae pÃ¡ginas especÃ­ficas de archivos PDF. Guarda pÃ¡ginas individuales como nuevos documentos.',
    description: '<p>Extraer PÃ¡ginas te permite seleccionar y guardar pÃ¡ginas especÃ­ficas de un PDF como nuevos archivos. Perfecto para crear extractos.</p><p>ExtracciÃ³n local.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta o selecciona el documento.' },
      { step: 2, title: 'Selecciona PÃ¡ginas', description: 'Haz clic en miniaturas o ingresa nÃºmeros de pÃ¡gina.' },
      { step: 3, title: 'Extrae y Descarga', description: 'Crea el nuevo PDF con las pÃ¡ginas seleccionadas.' },
    ],
    useCases: [
      { title: 'Crear Extractos', description: 'Extrae pÃ¡ginas relevantes para documentos de referencia.', icon: 'file-minus' },
      { title: 'Compartir Contenido', description: 'Extrae pÃ¡ginas especÃ­ficas para compartir.', icon: 'share-2' },
      { title: 'Archivar', description: 'Guarda pÃ¡ginas clave para archivo a largo plazo.', icon: 'archive' },
    ],
    faq: [
      { question: 'Â¿Puedo extraer pÃ¡ginas no consecutivas?', answer: 'SÃ­, selecciona cualquier combinaciÃ³n de pÃ¡ginas.' },
      { question: 'Â¿Se conservan los marcadores?', answer: 'Los marcadores a pÃ¡ginas extraÃ­das se conservan.' },
      { question: 'Â¿Puedo extraer de mÃºltiples PDFs?', answer: 'Esta herramienta trabaja con un PDF. Usa Combinar PDF para mÃºltiples archivos.' },
    ],
  },

  'organize-pdf': {
    title: 'Organizar PDF',
    metaDescription: 'Reordena, duplica y elimina pÃ¡ginas PDF. Arrastra y suelta para reorganizar.',
    description: '<p>Organizar PDF proporciona una interfaz de arrastrar y soltar para reorganizar pÃ¡ginas. Reordena, duplica o elimina pÃ¡ginas fÃ¡cilmente.</p><p>OrganizaciÃ³n local.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta o selecciona el documento.' },
      { step: 2, title: 'Reorganiza', description: 'Arrastra miniaturas para reordenar, duplicar o eliminar.' },
      { step: 3, title: 'Guarda y Descarga', description: 'Aplica los cambios y descarga el PDF reorganizado.' },
    ],
    useCases: [
      { title: 'Corregir Orden', description: 'Corrige el orden de pÃ¡ginas escaneadas incorrectamente.', icon: 'arrow-up-down' },
      { title: 'Orden Personalizado', description: 'Ordena pÃ¡ginas para presentaciones especÃ­ficas.', icon: 'list' },
      { title: 'Eliminar PÃ¡ginas', description: 'Elimina pÃ¡ginas en blanco o irrelevantes.', icon: 'trash-2' },
    ],
    faq: [
      { question: 'Â¿Puedo duplicar pÃ¡ginas?', answer: 'SÃ­, duplica cualquier pÃ¡gina y colÃ³cala donde quieras.' },
      { question: 'Â¿Hay funciÃ³n deshacer?', answer: 'SÃ­, soporta deshacer/rehacer y restablecer al original.' },
      { question: 'Â¿Puedo organizar mÃºltiples PDFs?', answer: 'Trabaja con un PDF. Primero combÃ­nalos con Combinar PDF.' },
    ],
  },

  'delete-pages': {
    title: 'Eliminar PÃ¡ginas',
    metaDescription: 'Elimina pÃ¡ginas no deseadas de archivos PDF. Selecciona y elimina pÃ¡ginas especÃ­ficas.',
    description: '<p>Eliminar PÃ¡ginas te permite quitar pÃ¡ginas no deseadas de tus documentos PDF. Elimina pÃ¡ginas en blanco o contenido innecesario.</p><p>Procesamiento local.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta o selecciona el documento.' },
      { step: 2, title: 'Selecciona PÃ¡ginas', description: 'Haz clic en miniaturas o ingresa nÃºmeros de pÃ¡gina.' },
      { step: 3, title: 'Elimina y Descarga', description: 'Elimina las pÃ¡ginas seleccionadas y descarga.' },
    ],
    useCases: [
      { title: 'Eliminar PÃ¡ginas en Blanco', description: 'Limpia documentos eliminando pÃ¡ginas vacÃ­as.', icon: 'file-x' },
      { title: 'Eliminar Contenido Sensible', description: 'Elimina pÃ¡ginas confidenciales antes de compartir.', icon: 'shield' },
      { title: 'Optimizar Documentos', description: 'Elimina pÃ¡ginas desactualizadas o irrelevantes.', icon: 'filter' },
    ],
    faq: [
      { question: 'Â¿Puedo recuperar pÃ¡ginas eliminadas?', answer: 'No, la eliminaciÃ³n es permanente. Guarda una copia de seguridad.' },
      { question: 'Â¿Puedo eliminar mÃºltiples pÃ¡ginas?', answer: 'SÃ­, selecciona y elimina mÃºltiples pÃ¡ginas a la vez.' },
      { question: 'Â¿Afecta los marcadores?', answer: 'Los marcadores a pÃ¡ginas eliminadas se remueven.' },
    ],
  },


  // ==================== EDITAR Y ANOTAR ====================
  'bookmark': {
    title: 'Editar Marcadores',
    metaDescription: 'AÃ±ade, edita y organiza marcadores en archivos PDF para navegaciÃ³n fÃ¡cil.',
    description: '<p>Editar Marcadores te permite crear y gestionar marcadores en tus documentos PDF para facilitar la navegaciÃ³n.</p><p>Procesamiento local.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta o selecciona el documento.' },
      { step: 2, title: 'Gestiona Marcadores', description: 'AÃ±ade, edita, elimina o reorganiza marcadores.' },
      { step: 3, title: 'Guarda y Descarga', description: 'Aplica los cambios y descarga el PDF.' },
    ],
    useCases: [
      { title: 'Crear Ãndice', description: 'AÃ±ade marcadores para crear un Ã­ndice navegable.', icon: 'bookmark' },
      { title: 'Organizar Documentos', description: 'Estructura documentos largos con marcadores.', icon: 'list' },
      { title: 'Mejorar Accesibilidad', description: 'Facilita la navegaciÃ³n en documentos extensos.', icon: 'navigation' },
    ],
    faq: [
      { question: 'Â¿Puedo crear marcadores anidados?', answer: 'SÃ­, puedes crear jerarquÃ­as de marcadores.' },
      { question: 'Â¿Los marcadores funcionan en todos los lectores?', answer: 'SÃ­, son compatibles con todos los lectores PDF estÃ¡ndar.' },
      { question: 'Â¿Puedo importar marcadores?', answer: 'Puedes crear marcadores manualmente o desde el Ã­ndice existente.' },
    ],
  },

  'table-of-contents': {
    title: 'Tabla de Contenidos',
    metaDescription: 'Genera automÃ¡ticamente una tabla de contenidos para documentos PDF.',
    description: '<p>Tabla de Contenidos genera automÃ¡ticamente un Ã­ndice navegable para tus documentos PDF basado en encabezados.</p><p>Procesamiento local.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta o selecciona el documento.' },
      { step: 2, title: 'Configura Opciones', description: 'Selecciona niveles de encabezado y estilo.' },
      { step: 3, title: 'Genera y Descarga', description: 'Crea la tabla de contenidos y descarga.' },
    ],
    useCases: [
      { title: 'Documentos Largos', description: 'AÃ±ade navegaciÃ³n a manuales y libros.', icon: 'book' },
      { title: 'Informes', description: 'Crea Ã­ndices para informes profesionales.', icon: 'file-text' },
      { title: 'DocumentaciÃ³n', description: 'Mejora la navegaciÃ³n en documentaciÃ³n tÃ©cnica.', icon: 'file-code' },
    ],
    faq: [
      { question: 'Â¿CÃ³mo detecta los encabezados?', answer: 'Analiza el formato del texto para identificar encabezados.' },
      { question: 'Â¿Puedo personalizar el estilo?', answer: 'SÃ­, puedes ajustar fuente, tamaÃ±o y formato.' },
      { question: 'Â¿DÃ³nde se inserta la tabla?', answer: 'Puedes elegir insertarla al inicio o en una pÃ¡gina especÃ­fica.' },
    ],
  },

  'page-numbers': {
    title: 'NÃºmeros de PÃ¡gina',
    metaDescription: 'AÃ±ade nÃºmeros de pÃ¡gina a documentos PDF con formato personalizable.',
    description: '<p>NÃºmeros de PÃ¡gina te permite aÃ±adir numeraciÃ³n a tus documentos PDF con posiciÃ³n y formato personalizables.</p><p>Procesamiento local.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta o selecciona el documento.' },
      { step: 2, title: 'Configura Formato', description: 'Selecciona posiciÃ³n, fuente, tamaÃ±o y formato.' },
      { step: 3, title: 'Aplica y Descarga', description: 'AÃ±ade los nÃºmeros y descarga el PDF.' },
    ],
    useCases: [
      { title: 'Documentos Profesionales', description: 'AÃ±ade numeraciÃ³n a informes y propuestas.', icon: 'file-text' },
      { title: 'Libros y Manuales', description: 'Numera pÃ¡ginas de publicaciones.', icon: 'book' },
      { title: 'Documentos Legales', description: 'AÃ±ade numeraciÃ³n requerida para documentos oficiales.', icon: 'scale' },
    ],
    faq: [
      { question: 'Â¿Puedo excluir pÃ¡ginas?', answer: 'SÃ­, puedes excluir portadas u otras pÃ¡ginas especÃ­ficas.' },
      { question: 'Â¿QuÃ© formatos estÃ¡n disponibles?', answer: 'NÃºmeros arÃ¡bigos, romanos, letras y formatos personalizados.' },
      { question: 'Â¿Puedo cambiar la posiciÃ³n?', answer: 'SÃ­, elige entre 9 posiciones diferentes en la pÃ¡gina.' },
    ],
  },

  'add-watermark': {
    title: 'AÃ±adir Marca de Agua',
    metaDescription: 'AÃ±ade marcas de agua de texto o imagen a documentos PDF.',
    description: '<p>AÃ±adir Marca de Agua te permite insertar marcas de agua de texto o imagen en tus documentos PDF para protecciÃ³n o branding.</p><p>Procesamiento local.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta o selecciona el documento.' },
      { step: 2, title: 'Configura Marca de Agua', description: 'Ingresa texto o sube imagen, ajusta posiciÃ³n y opacidad.' },
      { step: 3, title: 'Aplica y Descarga', description: 'AÃ±ade la marca de agua y descarga.' },
    ],
    useCases: [
      { title: 'Proteger Documentos', description: 'Marca documentos como confidenciales o borradores.', icon: 'shield' },
      { title: 'Branding', description: 'AÃ±ade logo de empresa a documentos.', icon: 'image' },
      { title: 'Derechos de Autor', description: 'Protege contenido con marcas de copyright.', icon: 'copyright' },
    ],
    faq: [
      { question: 'Â¿Puedo usar imÃ¡genes?', answer: 'SÃ­, soporta PNG, JPG y otros formatos de imagen.' },
      { question: 'Â¿Puedo ajustar la opacidad?', answer: 'SÃ­, ajusta la transparencia de 0% a 100%.' },
      { question: 'Â¿Se aplica a todas las pÃ¡ginas?', answer: 'Puedes aplicar a todas o seleccionar pÃ¡ginas especÃ­ficas.' },
    ],
  },

  'header-footer': {
    title: 'Encabezado y Pie de PÃ¡gina',
    metaDescription: 'AÃ±ade encabezados y pies de pÃ¡gina personalizados a documentos PDF.',
    description: '<p>Encabezado y Pie de PÃ¡gina te permite aÃ±adir texto personalizado en la parte superior e inferior de tus pÃ¡ginas PDF.</p><p>Procesamiento local.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta o selecciona el documento.' },
      { step: 2, title: 'Configura Contenido', description: 'Ingresa texto para encabezado y/o pie de pÃ¡gina.' },
      { step: 3, title: 'Aplica y Descarga', description: 'AÃ±ade el contenido y descarga el PDF.' },
    ],
    useCases: [
      { title: 'Documentos Corporativos', description: 'AÃ±ade nombre de empresa y fecha.', icon: 'building' },
      { title: 'Informes', description: 'Incluye tÃ­tulo del documento y nÃºmeros de pÃ¡gina.', icon: 'file-text' },
      { title: 'Documentos Legales', description: 'AÃ±ade informaciÃ³n de confidencialidad.', icon: 'scale' },
    ],
    faq: [
      { question: 'Â¿Puedo usar variables?', answer: 'SÃ­, incluye fecha, nÃºmero de pÃ¡gina y total de pÃ¡ginas.' },
      { question: 'Â¿Puedo personalizar la fuente?', answer: 'SÃ­, ajusta fuente, tamaÃ±o, color y alineaciÃ³n.' },
      { question: 'Â¿Puedo tener diferentes encabezados?', answer: 'Puedes configurar diferentes para pÃ¡ginas pares e impares.' },
    ],
  },

  'invert-colors': {
    title: 'Invertir Colores',
    metaDescription: 'Invierte los colores de documentos PDF para modo oscuro o efectos especiales.',
    description: '<p>Invertir Colores cambia los colores de tu PDF a su negativo, Ãºtil para modo oscuro o efectos visuales.</p><p>Procesamiento local.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta o selecciona el documento.' },
      { step: 2, title: 'Configura Opciones', description: 'Selecciona pÃ¡ginas y opciones de inversiÃ³n.' },
      { step: 3, title: 'Invierte y Descarga', description: 'Aplica la inversiÃ³n y descarga el PDF.' },
    ],
    useCases: [
      { title: 'Modo Oscuro', description: 'Crea versiones de modo oscuro para lectura nocturna.', icon: 'moon' },
      { title: 'Accesibilidad', description: 'Mejora la legibilidad para usuarios con sensibilidad a la luz.', icon: 'eye' },
      { title: 'Efectos Visuales', description: 'Crea efectos de negativo para diseÃ±o.', icon: 'palette' },
    ],
    faq: [
      { question: 'Â¿Afecta las imÃ¡genes?', answer: 'SÃ­, todos los elementos visuales se invierten.' },
      { question: 'Â¿Puedo invertir pÃ¡ginas especÃ­ficas?', answer: 'SÃ­, selecciona las pÃ¡ginas a invertir.' },
      { question: 'Â¿Es reversible?', answer: 'SÃ­, invierte de nuevo para restaurar los colores originales.' },
    ],
  },

  'background-color': {
    title: 'Color de Fondo',
    metaDescription: 'Cambia el color de fondo de pÃ¡ginas PDF.',
    description: '<p>Color de Fondo te permite cambiar el color de fondo de tus pÃ¡ginas PDF para mejorar la legibilidad o estÃ©tica.</p><p>Procesamiento local.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta o selecciona el documento.' },
      { step: 2, title: 'Selecciona Color', description: 'Elige el color de fondo deseado.' },
      { step: 3, title: 'Aplica y Descarga', description: 'Cambia el fondo y descarga el PDF.' },
    ],
    useCases: [
      { title: 'Lectura CÃ³moda', description: 'Usa fondos crema o sepia para reducir fatiga visual.', icon: 'eye' },
      { title: 'Branding', description: 'Aplica colores corporativos a documentos.', icon: 'palette' },
      { title: 'ImpresiÃ³n', description: 'Prepara documentos con fondos especÃ­ficos para impresiÃ³n.', icon: 'printer' },
    ],
    faq: [
      { question: 'Â¿Puedo usar cualquier color?', answer: 'SÃ­, selecciona cualquier color del selector o ingresa cÃ³digo hex.' },
      { question: 'Â¿Afecta el contenido?', answer: 'No, solo cambia el fondo. El contenido permanece intacto.' },
      { question: 'Â¿Puedo aplicar a pÃ¡ginas especÃ­ficas?', answer: 'SÃ­, selecciona las pÃ¡ginas a modificar.' },
    ],
  },

  'text-color': {
    title: 'Cambiar Color de Texto',
    metaDescription: 'Cambia el color del texto en documentos PDF.',
    description: '<p>Cambiar Color de Texto te permite modificar el color del texto en tus documentos PDF.</p><p>Procesamiento local.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta o selecciona el documento.' },
      { step: 2, title: 'Selecciona Colores', description: 'Elige el color original y el nuevo color.' },
      { step: 3, title: 'Aplica y Descarga', description: 'Cambia el color y descarga el PDF.' },
    ],
    useCases: [
      { title: 'Accesibilidad', description: 'Mejora el contraste para mejor legibilidad.', icon: 'eye' },
      { title: 'Branding', description: 'Aplica colores corporativos al texto.', icon: 'palette' },
      { title: 'ImpresiÃ³n', description: 'Prepara documentos para impresiÃ³n en blanco y negro.', icon: 'printer' },
    ],
    faq: [
      { question: 'Â¿Puedo cambiar colores especÃ­ficos?', answer: 'SÃ­, selecciona el color a reemplazar y el nuevo color.' },
      { question: 'Â¿Afecta las imÃ¡genes?', answer: 'No, solo afecta el texto del documento.' },
      { question: 'Â¿Funciona con todos los PDFs?', answer: 'Funciona mejor con PDFs que contienen texto real, no imÃ¡genes de texto.' },
    ],
  },

  'add-stamps': {
    title: 'AÃ±adir Sellos',
    metaDescription: 'AÃ±ade sellos predefinidos o personalizados a documentos PDF.',
    description: '<p>AÃ±adir Sellos te permite insertar sellos predefinidos como "Aprobado", "Confidencial" o sellos personalizados.</p><p>Procesamiento local.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta o selecciona el documento.' },
      { step: 2, title: 'Selecciona Sello', description: 'Elige un sello predefinido o crea uno personalizado.' },
      { step: 3, title: 'Coloca y Descarga', description: 'Posiciona el sello y descarga el PDF.' },
    ],
    useCases: [
      { title: 'AprobaciÃ³n de Documentos', description: 'Marca documentos como aprobados o rechazados.', icon: 'check-circle' },
      { title: 'Confidencialidad', description: 'AÃ±ade sellos de confidencial o uso interno.', icon: 'lock' },
      { title: 'Estado de Documentos', description: 'Marca como borrador, final o revisado.', icon: 'tag' },
    ],
    faq: [
      { question: 'Â¿QuÃ© sellos predefinidos hay?', answer: 'Incluye Aprobado, Rechazado, Confidencial, Borrador, Final y mÃ¡s.' },
      { question: 'Â¿Puedo crear sellos personalizados?', answer: 'SÃ­, crea sellos con texto e imagen personalizados.' },
      { question: 'Â¿Puedo aÃ±adir mÃºltiples sellos?', answer: 'SÃ­, aÃ±ade tantos sellos como necesites.' },
    ],
  },

  'remove-annotations': {
    title: 'Eliminar Anotaciones',
    metaDescription: 'Elimina todas las anotaciones y comentarios de documentos PDF.',
    description: '<p>Eliminar Anotaciones quita todos los comentarios, resaltados, notas y otras anotaciones de tus documentos PDF.</p><p>Procesamiento local.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta o selecciona el documento.' },
      { step: 2, title: 'Selecciona Tipos', description: 'Elige quÃ© tipos de anotaciones eliminar.' },
      { step: 3, title: 'Elimina y Descarga', description: 'Quita las anotaciones y descarga el PDF limpio.' },
    ],
    useCases: [
      { title: 'Limpiar Documentos', description: 'Elimina marcas de revisiÃ³n antes de publicar.', icon: 'eraser' },
      { title: 'Privacidad', description: 'Quita comentarios antes de compartir externamente.', icon: 'shield' },
      { title: 'VersiÃ³n Final', description: 'Crea versiones limpias de documentos revisados.', icon: 'file-check' },
    ],
    faq: [
      { question: 'Â¿QuÃ© tipos de anotaciones se eliminan?', answer: 'Comentarios, resaltados, notas adhesivas, dibujos y mÃ¡s.' },
      { question: 'Â¿Puedo eliminar selectivamente?', answer: 'SÃ­, elige quÃ© tipos de anotaciones eliminar.' },
      { question: 'Â¿Es reversible?', answer: 'No, guarda una copia de seguridad antes de eliminar.' },
    ],
  },

  'form-filler': {
    title: 'Rellenar Formularios',
    metaDescription: 'Rellena formularios PDF interactivos en lÃ­nea.',
    description: '<p>Rellenar Formularios te permite completar formularios PDF interactivos directamente en tu navegador.</p><p>Procesamiento local.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta o selecciona el formulario.' },
      { step: 2, title: 'Completa Campos', description: 'Rellena los campos del formulario.' },
      { step: 3, title: 'Guarda y Descarga', description: 'Guarda el formulario completado.' },
    ],
    useCases: [
      { title: 'Formularios Oficiales', description: 'Completa formularios gubernamentales o legales.', icon: 'file-text' },
      { title: 'Solicitudes', description: 'Rellena solicitudes de empleo o servicios.', icon: 'clipboard' },
      { title: 'Contratos', description: 'Completa contratos y acuerdos.', icon: 'file-signature' },
    ],
    faq: [
      { question: 'Â¿Funciona con todos los formularios?', answer: 'Funciona con formularios PDF interactivos estÃ¡ndar.' },
      { question: 'Â¿Puedo guardar y continuar despuÃ©s?', answer: 'SÃ­, guarda el progreso y continÃºa mÃ¡s tarde.' },
      { question: 'Â¿Puedo aÃ±adir firma?', answer: 'SÃ­, usa la herramienta Firmar PDF para aÃ±adir firmas.' },
    ],
  },

  'form-creator': {
    title: 'Crear Formularios',
    metaDescription: 'Crea formularios PDF interactivos con campos rellenables.',
    description: '<p>Crear Formularios te permite aÃ±adir campos interactivos a documentos PDF para crear formularios rellenables.</p><p>Procesamiento local.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta o selecciona el documento base.' },
      { step: 2, title: 'AÃ±ade Campos', description: 'Inserta campos de texto, casillas, botones de radio, etc.' },
      { step: 3, title: 'Guarda y Descarga', description: 'Guarda el formulario interactivo.' },
    ],
    useCases: [
      { title: 'Formularios de Empresa', description: 'Crea formularios internos rellenables.', icon: 'building' },
      { title: 'Encuestas', description: 'DiseÃ±a encuestas y cuestionarios.', icon: 'clipboard-list' },
      { title: 'Solicitudes', description: 'Crea formularios de solicitud profesionales.', icon: 'file-plus' },
    ],
    faq: [
      { question: 'Â¿QuÃ© tipos de campos puedo aÃ±adir?', answer: 'Texto, casillas, botones de radio, listas desplegables, fechas y mÃ¡s.' },
      { question: 'Â¿Puedo hacer campos obligatorios?', answer: 'SÃ­, configura validaciÃ³n y campos requeridos.' },
      { question: 'Â¿Los formularios funcionan en todos los lectores?', answer: 'SÃ­, son compatibles con lectores PDF estÃ¡ndar.' },
    ],
  },

  'remove-blank-pages': {
    title: 'Eliminar PÃ¡ginas en Blanco',
    metaDescription: 'Detecta y elimina automÃ¡ticamente pÃ¡ginas en blanco de documentos PDF.',
    description: '<p>Eliminar PÃ¡ginas en Blanco detecta y elimina automÃ¡ticamente las pÃ¡ginas vacÃ­as de tus documentos PDF.</p><p>Procesamiento local.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta o selecciona el documento.' },
      { step: 2, title: 'Configura Sensibilidad', description: 'Ajusta el umbral de detecciÃ³n de pÃ¡ginas en blanco.' },
      { step: 3, title: 'Elimina y Descarga', description: 'Quita las pÃ¡ginas en blanco y descarga.' },
    ],
    useCases: [
      { title: 'Limpiar Escaneos', description: 'Elimina pÃ¡ginas en blanco de documentos escaneados.', icon: 'file-minus' },
      { title: 'Optimizar Documentos', description: 'Reduce el tamaÃ±o eliminando pÃ¡ginas vacÃ­as.', icon: 'zap' },
      { title: 'Preparar para ImpresiÃ³n', description: 'Elimina pÃ¡ginas innecesarias antes de imprimir.', icon: 'printer' },
    ],
    faq: [
      { question: 'Â¿CÃ³mo detecta pÃ¡ginas en blanco?', answer: 'Analiza el contenido de cada pÃ¡gina para detectar vacÃ­as.' },
      { question: 'Â¿Puedo revisar antes de eliminar?', answer: 'SÃ­, muestra las pÃ¡ginas detectadas para confirmaciÃ³n.' },
      { question: 'Â¿Detecta pÃ¡ginas casi en blanco?', answer: 'SÃ­, ajusta la sensibilidad para incluir pÃ¡ginas con poco contenido.' },
    ],
  },


  // ==================== CONVERTIR A PDF ====================
  'image-to-pdf': {
    title: 'Imagen a PDF',
    metaDescription: 'Convierte mÃºltiples formatos de imagen a PDF. Soporta JPG, PNG, WebP, BMP, TIFF, SVG, HEIC.',
    description: '<p>Imagen a PDF convierte varios formatos de imagen en documentos PDF. Soporta JPG, PNG, WebP, BMP, TIFF, SVG y HEIC.</p><p>ConversiÃ³n local.</p>',
    howToUse: [
      { step: 1, title: 'Sube ImÃ¡genes', description: 'Arrastra y suelta imÃ¡genes o haz clic para seleccionar.' },
      { step: 2, title: 'Ordena y Configura', description: 'Reordena y selecciona opciones de pÃ¡gina.' },
      { step: 3, title: 'Convierte y Descarga', description: 'Crea el PDF y descarga.' },
    ],
    useCases: [
      { title: 'DocumentaciÃ³n', description: 'Convierte capturas de pantalla en documentaciÃ³n.', icon: 'image' },
      { title: 'Portafolios', description: 'Crea portafolios de imÃ¡genes en PDF.', icon: 'folder' },
      { title: 'Archivos', description: 'Archiva imÃ¡genes en formato PDF.', icon: 'archive' },
    ],
    faq: [
      { question: 'Â¿QuÃ© formatos soporta?', answer: 'JPG, PNG, WebP, BMP, TIFF, SVG y HEIC.' },
      { question: 'Â¿Se mantiene la calidad?', answer: 'SÃ­, las imÃ¡genes se incrustan en calidad original.' },
      { question: 'Â¿Puedo combinar diferentes formatos?', answer: 'SÃ­, mezcla cualquier formato de imagen soportado.' },
    ],
  },

  'png-to-pdf': {
    title: 'PNG a PDF',
    metaDescription: 'Convierte imÃ¡genes PNG a documentos PDF con transparencia preservada.',
    description: '<p>PNG a PDF convierte imÃ¡genes PNG en documentos PDF, preservando la transparencia cuando es posible.</p><p>ConversiÃ³n local.</p>',
    howToUse: [
      { step: 1, title: 'Sube ImÃ¡genes PNG', description: 'Arrastra y suelta archivos PNG.' },
      { step: 2, title: 'Configura Opciones', description: 'Selecciona tamaÃ±o de pÃ¡gina y orientaciÃ³n.' },
      { step: 3, title: 'Convierte y Descarga', description: 'Crea el PDF y descarga.' },
    ],
    useCases: [
      { title: 'GrÃ¡ficos', description: 'Convierte grÃ¡ficos PNG con transparencia.', icon: 'image' },
      { title: 'Logos', description: 'Crea PDFs de logos para impresiÃ³n.', icon: 'star' },
      { title: 'Capturas', description: 'Convierte capturas de pantalla en PDF.', icon: 'monitor' },
    ],
    faq: [
      { question: 'Â¿Se preserva la transparencia?', answer: 'La transparencia se preserva en el PDF resultante.' },
      { question: 'Â¿Puedo convertir mÃºltiples PNGs?', answer: 'SÃ­, combina mÃºltiples PNGs en un PDF.' },
      { question: 'Â¿QuÃ© calidad tiene el resultado?', answer: 'Se mantiene la calidad original de las imÃ¡genes.' },
    ],
  },

  'webp-to-pdf': {
    title: 'WebP a PDF',
    metaDescription: 'Convierte imÃ¡genes WebP a documentos PDF.',
    description: '<p>WebP a PDF convierte imÃ¡genes en formato WebP a documentos PDF.</p><p>ConversiÃ³n local.</p>',
    howToUse: [
      { step: 1, title: 'Sube ImÃ¡genes WebP', description: 'Arrastra y suelta archivos WebP.' },
      { step: 2, title: 'Configura Opciones', description: 'Selecciona tamaÃ±o de pÃ¡gina.' },
      { step: 3, title: 'Convierte y Descarga', description: 'Crea el PDF y descarga.' },
    ],
    useCases: [
      { title: 'ImÃ¡genes Web', description: 'Convierte imÃ¡genes descargadas de la web.', icon: 'globe' },
      { title: 'Archivos', description: 'Archiva imÃ¡genes WebP en formato PDF.', icon: 'archive' },
      { title: 'DocumentaciÃ³n', description: 'Incluye imÃ¡genes WebP en documentos.', icon: 'file-text' },
    ],
    faq: [
      { question: 'Â¿QuÃ© es WebP?', answer: 'WebP es un formato de imagen moderno desarrollado por Google.' },
      { question: 'Â¿Se mantiene la calidad?', answer: 'SÃ­, se preserva la calidad de la imagen original.' },
      { question: 'Â¿Soporta WebP animado?', answer: 'Se convierte el primer fotograma de WebP animados.' },
    ],
  },

  'svg-to-pdf': {
    title: 'SVG a PDF',
    metaDescription: 'Convierte grÃ¡ficos vectoriales SVG a documentos PDF.',
    description: '<p>SVG a PDF convierte grÃ¡ficos vectoriales SVG en documentos PDF, manteniendo la escalabilidad.</p><p>ConversiÃ³n local.</p>',
    howToUse: [
      { step: 1, title: 'Sube Archivos SVG', description: 'Arrastra y suelta archivos SVG.' },
      { step: 2, title: 'Configura Opciones', description: 'Selecciona tamaÃ±o de pÃ¡gina.' },
      { step: 3, title: 'Convierte y Descarga', description: 'Crea el PDF y descarga.' },
    ],
    useCases: [
      { title: 'Logos', description: 'Convierte logos vectoriales para impresiÃ³n.', icon: 'star' },
      { title: 'Ilustraciones', description: 'Crea PDFs de ilustraciones vectoriales.', icon: 'pen-tool' },
      { title: 'Diagramas', description: 'Convierte diagramas SVG a PDF.', icon: 'git-branch' },
    ],
    faq: [
      { question: 'Â¿Se mantiene la calidad vectorial?', answer: 'SÃ­, los grÃ¡ficos permanecen escalables en el PDF.' },
      { question: 'Â¿Soporta SVG complejos?', answer: 'SÃ­, soporta la mayorÃ­a de caracterÃ­sticas SVG.' },
      { question: 'Â¿Puedo convertir mÃºltiples SVGs?', answer: 'SÃ­, combina mÃºltiples SVGs en un PDF.' },
    ],
  },

  'bmp-to-pdf': {
    title: 'BMP a PDF',
    metaDescription: 'Convierte imÃ¡genes BMP a documentos PDF.',
    description: '<p>BMP a PDF convierte imÃ¡genes en formato BMP (bitmap) a documentos PDF.</p><p>ConversiÃ³n local.</p>',
    howToUse: [
      { step: 1, title: 'Sube ImÃ¡genes BMP', description: 'Arrastra y suelta archivos BMP.' },
      { step: 2, title: 'Configura Opciones', description: 'Selecciona tamaÃ±o de pÃ¡gina.' },
      { step: 3, title: 'Convierte y Descarga', description: 'Crea el PDF y descarga.' },
    ],
    useCases: [
      { title: 'ImÃ¡genes Antiguas', description: 'Convierte archivos BMP heredados.', icon: 'image' },
      { title: 'Capturas Windows', description: 'Convierte capturas en formato BMP.', icon: 'monitor' },
      { title: 'Archivos', description: 'Archiva imÃ¡genes BMP en PDF.', icon: 'archive' },
    ],
    faq: [
      { question: 'Â¿QuÃ© es BMP?', answer: 'BMP es un formato de imagen sin compresiÃ³n de Windows.' },
      { question: 'Â¿Se reduce el tamaÃ±o?', answer: 'SÃ­, el PDF resultante suele ser mÃ¡s pequeÃ±o que el BMP original.' },
      { question: 'Â¿Se mantiene la calidad?', answer: 'SÃ­, se preserva la calidad de la imagen.' },
    ],
  },

  'heic-to-pdf': {
    title: 'HEIC a PDF',
    metaDescription: 'Convierte imÃ¡genes HEIC de iPhone a documentos PDF.',
    description: '<p>HEIC a PDF convierte imÃ¡genes HEIC (formato de iPhone) a documentos PDF.</p><p>ConversiÃ³n local.</p>',
    howToUse: [
      { step: 1, title: 'Sube ImÃ¡genes HEIC', description: 'Arrastra y suelta archivos HEIC.' },
      { step: 2, title: 'Configura Opciones', description: 'Selecciona tamaÃ±o de pÃ¡gina.' },
      { step: 3, title: 'Convierte y Descarga', description: 'Crea el PDF y descarga.' },
    ],
    useCases: [
      { title: 'Fotos de iPhone', description: 'Convierte fotos de iPhone a PDF.', icon: 'smartphone' },
      { title: 'Ãlbumes', description: 'Crea Ã¡lbumes PDF de fotos HEIC.', icon: 'image' },
      { title: 'Compartir', description: 'Convierte para compartir con usuarios sin soporte HEIC.', icon: 'share-2' },
    ],
    faq: [
      { question: 'Â¿QuÃ© es HEIC?', answer: 'HEIC es el formato de imagen predeterminado de iPhone desde iOS 11.' },
      { question: 'Â¿Se mantiene la calidad?', answer: 'SÃ­, se preserva la calidad de la imagen original.' },
      { question: 'Â¿Soporta Live Photos?', answer: 'Se convierte la imagen estÃ¡tica de Live Photos.' },
    ],
  },

  'tiff-to-pdf': {
    title: 'TIFF a PDF',
    metaDescription: 'Convierte imÃ¡genes TIFF a documentos PDF.',
    description: '<p>TIFF a PDF convierte imÃ¡genes TIFF de alta calidad a documentos PDF.</p><p>ConversiÃ³n local.</p>',
    howToUse: [
      { step: 1, title: 'Sube ImÃ¡genes TIFF', description: 'Arrastra y suelta archivos TIFF.' },
      { step: 2, title: 'Configura Opciones', description: 'Selecciona tamaÃ±o de pÃ¡gina.' },
      { step: 3, title: 'Convierte y Descarga', description: 'Crea el PDF y descarga.' },
    ],
    useCases: [
      { title: 'Documentos Escaneados', description: 'Convierte escaneos TIFF a PDF.', icon: 'scan' },
      { title: 'FotografÃ­a Profesional', description: 'Crea PDFs de fotos de alta calidad.', icon: 'camera' },
      { title: 'Archivos', description: 'Archiva imÃ¡genes TIFF en PDF.', icon: 'archive' },
    ],
    faq: [
      { question: 'Â¿Soporta TIFF multipÃ¡gina?', answer: 'SÃ­, cada pÃ¡gina TIFF se convierte en una pÃ¡gina PDF.' },
      { question: 'Â¿Se mantiene la calidad?', answer: 'SÃ­, se preserva la calidad de la imagen.' },
      { question: 'Â¿Soporta TIFF con capas?', answer: 'Se aplana el TIFF al convertir.' },
    ],
  },

  'txt-to-pdf': {
    title: 'Texto a PDF',
    metaDescription: 'Convierte archivos de texto plano a documentos PDF.',
    description: '<p>Texto a PDF convierte archivos de texto plano (.txt) en documentos PDF con formato personalizable.</p><p>ConversiÃ³n local.</p>',
    howToUse: [
      { step: 1, title: 'Sube Archivo de Texto', description: 'Arrastra y suelta o pega texto.' },
      { step: 2, title: 'Configura Formato', description: 'Selecciona fuente, tamaÃ±o y mÃ¡rgenes.' },
      { step: 3, title: 'Convierte y Descarga', description: 'Crea el PDF y descarga.' },
    ],
    useCases: [
      { title: 'DocumentaciÃ³n', description: 'Convierte archivos README y documentaciÃ³n.', icon: 'file-text' },
      { title: 'CÃ³digo', description: 'Crea PDFs de cÃ³digo fuente.', icon: 'code' },
      { title: 'Notas', description: 'Convierte notas de texto a PDF.', icon: 'sticky-note' },
    ],
    faq: [
      { question: 'Â¿Puedo personalizar la fuente?', answer: 'SÃ­, selecciona fuente, tamaÃ±o y color.' },
      { question: 'Â¿Soporta caracteres especiales?', answer: 'SÃ­, soporta Unicode y caracteres especiales.' },
      { question: 'Â¿Puedo aÃ±adir encabezados?', answer: 'SÃ­, configura encabezados y pies de pÃ¡gina.' },
    ],
  },

  'json-to-pdf': {
    title: 'JSON a PDF',
    metaDescription: 'Convierte datos JSON a documentos PDF formateados.',
    description: '<p>JSON a PDF convierte datos JSON en documentos PDF con formato legible.</p><p>ConversiÃ³n local.</p>',
    howToUse: [
      { step: 1, title: 'Sube Archivo JSON', description: 'Arrastra y suelta o pega JSON.' },
      { step: 2, title: 'Configura Formato', description: 'Selecciona estilo de presentaciÃ³n.' },
      { step: 3, title: 'Convierte y Descarga', description: 'Crea el PDF y descarga.' },
    ],
    useCases: [
      { title: 'DocumentaciÃ³n API', description: 'Crea documentaciÃ³n de respuestas API.', icon: 'code' },
      { title: 'Informes de Datos', description: 'Genera informes de datos JSON.', icon: 'bar-chart' },
      { title: 'Configuraciones', description: 'Documenta archivos de configuraciÃ³n.', icon: 'settings' },
    ],
    faq: [
      { question: 'Â¿CÃ³mo se formatea el JSON?', answer: 'Se presenta con indentaciÃ³n y resaltado de sintaxis.' },
      { question: 'Â¿Soporta JSON grandes?', answer: 'SÃ­, maneja archivos JSON de cualquier tamaÃ±o.' },
      { question: 'Â¿Puedo personalizar colores?', answer: 'SÃ­, configura el esquema de colores del resaltado.' },
    ],
  },


  // ==================== CONVERTIR DESDE PDF ====================
  'pdf-to-jpg': {
    title: 'PDF a JPG',
    metaDescription: 'Convierte pÃ¡ginas PDF a imÃ¡genes JPG de alta calidad.',
    description: '<p>PDF a JPG convierte las pÃ¡ginas de tu documento PDF en imÃ¡genes JPG de alta calidad.</p><p>ConversiÃ³n local.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta o selecciona el documento.' },
      { step: 2, title: 'Configura Opciones', description: 'Selecciona calidad y pÃ¡ginas a convertir.' },
      { step: 3, title: 'Convierte y Descarga', description: 'Descarga las imÃ¡genes JPG.' },
    ],
    useCases: [
      { title: 'Compartir en Redes', description: 'Convierte pÃ¡ginas para compartir en redes sociales.', icon: 'share-2' },
      { title: 'Presentaciones', description: 'Usa pÃ¡ginas PDF como imÃ¡genes en presentaciones.', icon: 'presentation' },
      { title: 'Web', description: 'Convierte para usar en sitios web.', icon: 'globe' },
    ],
    faq: [
      { question: 'Â¿QuÃ© calidad tienen las imÃ¡genes?', answer: 'Configura la calidad de 1 a 100, con 100 siendo la mÃ¡xima.' },
      { question: 'Â¿Puedo convertir pÃ¡ginas especÃ­ficas?', answer: 'SÃ­, selecciona las pÃ¡ginas a convertir.' },
      { question: 'Â¿CÃ³mo descargo mÃºltiples imÃ¡genes?', answer: 'Se descargan como archivo ZIP.' },
    ],
  },

  'pdf-to-png': {
    title: 'PDF a PNG',
    metaDescription: 'Convierte pÃ¡ginas PDF a imÃ¡genes PNG con transparencia.',
    description: '<p>PDF a PNG convierte las pÃ¡ginas de tu documento PDF en imÃ¡genes PNG de alta calidad.</p><p>ConversiÃ³n local.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta o selecciona el documento.' },
      { step: 2, title: 'Configura Opciones', description: 'Selecciona resoluciÃ³n y pÃ¡ginas.' },
      { step: 3, title: 'Convierte y Descarga', description: 'Descarga las imÃ¡genes PNG.' },
    ],
    useCases: [
      { title: 'GrÃ¡ficos', description: 'Extrae grÃ¡ficos con transparencia.', icon: 'image' },
      { title: 'DiseÃ±o', description: 'Usa pÃ¡ginas en proyectos de diseÃ±o.', icon: 'palette' },
      { title: 'DocumentaciÃ³n', description: 'Incluye pÃ¡ginas como imÃ¡genes en documentos.', icon: 'file-text' },
    ],
    faq: [
      { question: 'Â¿Soporta transparencia?', answer: 'SÃ­, las Ã¡reas transparentes se preservan.' },
      { question: 'Â¿QuÃ© resoluciÃ³n tienen?', answer: 'Configura la resoluciÃ³n en DPI (72-600).' },
      { question: 'Â¿Puedo convertir todas las pÃ¡ginas?', answer: 'SÃ­, convierte todas o selecciona especÃ­ficas.' },
    ],
  },

  'pdf-to-webp': {
    title: 'PDF a WebP',
    metaDescription: 'Convierte pÃ¡ginas PDF a imÃ¡genes WebP optimizadas para web.',
    description: '<p>PDF a WebP convierte las pÃ¡ginas de tu documento PDF en imÃ¡genes WebP optimizadas para web.</p><p>ConversiÃ³n local.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta o selecciona el documento.' },
      { step: 2, title: 'Configura Opciones', description: 'Selecciona calidad y pÃ¡ginas.' },
      { step: 3, title: 'Convierte y Descarga', description: 'Descarga las imÃ¡genes WebP.' },
    ],
    useCases: [
      { title: 'Sitios Web', description: 'Crea imÃ¡genes optimizadas para web.', icon: 'globe' },
      { title: 'Rendimiento', description: 'Reduce el tamaÃ±o de imÃ¡genes para carga rÃ¡pida.', icon: 'zap' },
      { title: 'Blogs', description: 'Convierte pÃ¡ginas para artÃ­culos de blog.', icon: 'edit' },
    ],
    faq: [
      { question: 'Â¿Por quÃ© WebP?', answer: 'WebP ofrece mejor compresiÃ³n que JPG y PNG.' },
      { question: 'Â¿Es compatible con todos los navegadores?', answer: 'SÃ­, todos los navegadores modernos soportan WebP.' },
      { question: 'Â¿Puedo ajustar la compresiÃ³n?', answer: 'SÃ­, configura el nivel de calidad.' },
    ],
  },

  'pdf-to-bmp': {
    title: 'PDF a BMP',
    metaDescription: 'Convierte pÃ¡ginas PDF a imÃ¡genes BMP sin compresiÃ³n.',
    description: '<p>PDF a BMP convierte las pÃ¡ginas de tu documento PDF en imÃ¡genes BMP sin compresiÃ³n.</p><p>ConversiÃ³n local.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta o selecciona el documento.' },
      { step: 2, title: 'Configura Opciones', description: 'Selecciona resoluciÃ³n y pÃ¡ginas.' },
      { step: 3, title: 'Convierte y Descarga', description: 'Descarga las imÃ¡genes BMP.' },
    ],
    useCases: [
      { title: 'Compatibilidad', description: 'Crea imÃ¡genes para software antiguo.', icon: 'monitor' },
      { title: 'ImpresiÃ³n', description: 'Genera imÃ¡genes sin pÃ©rdida para impresiÃ³n.', icon: 'printer' },
      { title: 'EdiciÃ³n', description: 'Crea imÃ¡genes para ediciÃ³n sin pÃ©rdida.', icon: 'edit' },
    ],
    faq: [
      { question: 'Â¿Por quÃ© BMP?', answer: 'BMP no tiene compresiÃ³n, ideal para mÃ¡xima calidad.' },
      { question: 'Â¿Los archivos son grandes?', answer: 'SÃ­, BMP produce archivos mÃ¡s grandes que otros formatos.' },
      { question: 'Â¿Puedo convertir mÃºltiples pÃ¡ginas?', answer: 'SÃ­, se descargan como archivo ZIP.' },
    ],
  },

  'pdf-to-tiff': {
    title: 'PDF a TIFF',
    metaDescription: 'Convierte pÃ¡ginas PDF a imÃ¡genes TIFF de alta calidad.',
    description: '<p>PDF a TIFF convierte las pÃ¡ginas de tu documento PDF en imÃ¡genes TIFF de alta calidad.</p><p>ConversiÃ³n local.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta o selecciona el documento.' },
      { step: 2, title: 'Configura Opciones', description: 'Selecciona resoluciÃ³n y compresiÃ³n.' },
      { step: 3, title: 'Convierte y Descarga', description: 'Descarga las imÃ¡genes TIFF.' },
    ],
    useCases: [
      { title: 'ImpresiÃ³n Profesional', description: 'Crea imÃ¡genes para impresiÃ³n de alta calidad.', icon: 'printer' },
      { title: 'Archivos', description: 'Archiva documentos en formato TIFF.', icon: 'archive' },
      { title: 'Escaneo', description: 'Convierte para flujos de trabajo de escaneo.', icon: 'scan' },
    ],
    faq: [
      { question: 'Â¿Soporta TIFF multipÃ¡gina?', answer: 'SÃ­, puede crear un TIFF multipÃ¡gina o archivos separados.' },
      { question: 'Â¿QuÃ© compresiÃ³n usa?', answer: 'Soporta LZW, ZIP y sin compresiÃ³n.' },
      { question: 'Â¿QuÃ© resoluciÃ³n recomiendas?', answer: '300 DPI para impresiÃ³n, 150 DPI para pantalla.' },
    ],
  },

  'pdf-to-greyscale': {
    title: 'PDF a Escala de Grises',
    metaDescription: 'Convierte documentos PDF a color a escala de grises.',
    description: '<p>PDF a Escala de Grises convierte documentos PDF a color en versiones en escala de grises.</p><p>ConversiÃ³n local.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta o selecciona el documento.' },
      { step: 2, title: 'Configura Opciones', description: 'Selecciona pÃ¡ginas a convertir.' },
      { step: 3, title: 'Convierte y Descarga', description: 'Descarga el PDF en escala de grises.' },
    ],
    useCases: [
      { title: 'Ahorro de Tinta', description: 'Prepara documentos para impresiÃ³n econÃ³mica.', icon: 'printer' },
      { title: 'Documentos Formales', description: 'Crea versiones formales en blanco y negro.', icon: 'file-text' },
      { title: 'Accesibilidad', description: 'Mejora la legibilidad para algunos usuarios.', icon: 'eye' },
    ],
    faq: [
      { question: 'Â¿Es reversible?', answer: 'No, guarda una copia del original a color.' },
      { question: 'Â¿Afecta las imÃ¡genes?', answer: 'SÃ­, todas las imÃ¡genes se convierten a grises.' },
      { question: 'Â¿Reduce el tamaÃ±o del archivo?', answer: 'Puede reducir ligeramente el tamaÃ±o.' },
    ],
  },

  'pdf-to-json': {
    title: 'PDF a JSON',
    metaDescription: 'Extrae datos estructurados de documentos PDF a formato JSON.',
    description: '<p>PDF a JSON extrae el contenido y estructura de documentos PDF en formato JSON.</p><p>ExtracciÃ³n local.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta o selecciona el documento.' },
      { step: 2, title: 'Configura Opciones', description: 'Selecciona quÃ© datos extraer.' },
      { step: 3, title: 'Extrae y Descarga', description: 'Descarga el archivo JSON.' },
    ],
    useCases: [
      { title: 'Procesamiento de Datos', description: 'Extrae datos para procesamiento automatizado.', icon: 'database' },
      { title: 'IntegraciÃ³n', description: 'Integra contenido PDF en aplicaciones.', icon: 'plug' },
      { title: 'AnÃ¡lisis', description: 'Analiza estructura y contenido de PDFs.', icon: 'bar-chart' },
    ],
    faq: [
      { question: 'Â¿QuÃ© datos se extraen?', answer: 'Texto, metadatos, estructura de pÃ¡ginas y mÃ¡s.' },
      { question: 'Â¿Extrae tablas?', answer: 'Intenta detectar y estructurar tablas.' },
      { question: 'Â¿Funciona con PDFs escaneados?', answer: 'Para PDFs escaneados, usa primero OCR PDF.' },
    ],
  },


  // ==================== ORGANIZAR Y GESTIONAR ====================
  'ocr-pdf': {
    title: 'OCR PDF',
    metaDescription: 'Reconocimiento Ã³ptico de caracteres para hacer PDFs escaneados buscables.',
    description: '<p>OCR PDF aplica reconocimiento Ã³ptico de caracteres a PDFs escaneados para hacerlos buscables y editables.</p><p>Procesamiento local.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta el PDF escaneado.' },
      { step: 2, title: 'Selecciona Idioma', description: 'Elige el idioma del documento.' },
      { step: 3, title: 'Procesa y Descarga', description: 'Aplica OCR y descarga el PDF buscable.' },
    ],
    useCases: [
      { title: 'Documentos Escaneados', description: 'Haz buscables documentos escaneados.', icon: 'scan' },
      { title: 'Archivos HistÃ³ricos', description: 'Digitaliza documentos antiguos.', icon: 'archive' },
      { title: 'Accesibilidad', description: 'Permite lectores de pantalla en PDFs escaneados.', icon: 'eye' },
    ],
    faq: [
      { question: 'Â¿QuÃ© idiomas soporta?', answer: 'Soporta mÃ¡s de 100 idiomas incluyendo espaÃ±ol, inglÃ©s, chino y mÃ¡s.' },
      { question: 'Â¿QuÃ© precisiÃ³n tiene?', answer: 'La precisiÃ³n depende de la calidad del escaneo, tÃ­picamente 95%+.' },
      { question: 'Â¿Modifica el aspecto del PDF?', answer: 'No, aÃ±ade una capa de texto invisible sobre la imagen.' },
    ],
  },

  'alternate-merge': {
    title: 'CombinaciÃ³n Alternada',
    metaDescription: 'Combina dos PDFs alternando pÃ¡ginas de cada documento.',
    description: '<p>CombinaciÃ³n Alternada combina dos PDFs alternando pÃ¡ginas de cada documento, Ãºtil para documentos de doble cara.</p><p>Procesamiento local.</p>',
    howToUse: [
      { step: 1, title: 'Sube Dos PDFs', description: 'Arrastra y suelta los dos documentos.' },
      { step: 2, title: 'Configura Orden', description: 'Selecciona el orden de alternancia.' },
      { step: 3, title: 'Combina y Descarga', description: 'Crea el PDF combinado.' },
    ],
    useCases: [
      { title: 'Escaneos Doble Cara', description: 'Combina escaneos de anverso y reverso.', icon: 'copy' },
      { title: 'Documentos BilingÃ¼es', description: 'Alterna pÃ¡ginas en dos idiomas.', icon: 'languages' },
      { title: 'ComparaciÃ³n', description: 'Alterna versiones para comparaciÃ³n.', icon: 'git-compare' },
    ],
    faq: [
      { question: 'Â¿QuÃ© pasa si tienen diferente nÃºmero de pÃ¡ginas?', answer: 'Las pÃ¡ginas extra se aÃ±aden al final.' },
      { question: 'Â¿Puedo invertir el orden de uno?', answer: 'SÃ­, puedes invertir el orden de cualquier documento.' },
      { question: 'Â¿Puedo combinar mÃ¡s de dos PDFs?', answer: 'Esta herramienta es para dos PDFs. Usa Combinar PDF para mÃ¡s.' },
    ],
  },

  'add-attachments': {
    title: 'AÃ±adir Adjuntos',
    metaDescription: 'AÃ±ade archivos adjuntos a documentos PDF.',
    description: '<p>AÃ±adir Adjuntos te permite incrustar archivos dentro de documentos PDF.</p><p>Procesamiento local.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta el documento.' },
      { step: 2, title: 'AÃ±ade Archivos', description: 'Selecciona los archivos a adjuntar.' },
      { step: 3, title: 'Guarda y Descarga', description: 'Descarga el PDF con adjuntos.' },
    ],
    useCases: [
      { title: 'DocumentaciÃ³n', description: 'Incluye archivos de soporte en documentos.', icon: 'paperclip' },
      { title: 'Informes', description: 'Adjunta datos fuente a informes.', icon: 'file-text' },
      { title: 'Contratos', description: 'Incluye anexos en contratos.', icon: 'file-signature' },
    ],
    faq: [
      { question: 'Â¿QuÃ© tipos de archivos puedo adjuntar?', answer: 'Cualquier tipo de archivo: documentos, imÃ¡genes, hojas de cÃ¡lculo, etc.' },
      { question: 'Â¿Hay lÃ­mite de tamaÃ±o?', answer: 'El tamaÃ±o total del PDF con adjuntos no debe exceder 500MB.' },
      { question: 'Â¿CÃ³mo se accede a los adjuntos?', answer: 'Los lectores PDF muestran los adjuntos en un panel lateral.' },
    ],
  },

  'extract-attachments': {
    title: 'Extraer Adjuntos',
    metaDescription: 'Extrae archivos adjuntos de documentos PDF.',
    description: '<p>Extraer Adjuntos te permite descargar los archivos incrustados en documentos PDF.</p><p>Procesamiento local.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta el documento.' },
      { step: 2, title: 'Revisa Adjuntos', description: 'Ve la lista de archivos adjuntos.' },
      { step: 3, title: 'Extrae y Descarga', description: 'Descarga los adjuntos seleccionados.' },
    ],
    useCases: [
      { title: 'Recuperar Archivos', description: 'Extrae archivos de documentos recibidos.', icon: 'download' },
      { title: 'OrganizaciÃ³n', description: 'Separa adjuntos para organizaciÃ³n.', icon: 'folder' },
      { title: 'AnÃ¡lisis', description: 'Extrae datos adjuntos para anÃ¡lisis.', icon: 'bar-chart' },
    ],
    faq: [
      { question: 'Â¿CÃ³mo sÃ© si un PDF tiene adjuntos?', answer: 'La herramienta muestra todos los adjuntos encontrados.' },
      { question: 'Â¿Puedo extraer adjuntos especÃ­ficos?', answer: 'SÃ­, selecciona los adjuntos a extraer.' },
      { question: 'Â¿Se modifica el PDF original?', answer: 'No, solo se extraen copias de los adjuntos.' },
    ],
  },

  'edit-attachments': {
    title: 'Editar Adjuntos',
    metaDescription: 'Gestiona los archivos adjuntos en documentos PDF.',
    description: '<p>Editar Adjuntos te permite aÃ±adir, eliminar y renombrar archivos adjuntos en documentos PDF.</p><p>Procesamiento local.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta el documento.' },
      { step: 2, title: 'Gestiona Adjuntos', description: 'AÃ±ade, elimina o renombra adjuntos.' },
      { step: 3, title: 'Guarda y Descarga', description: 'Descarga el PDF modificado.' },
    ],
    useCases: [
      { title: 'Actualizar Adjuntos', description: 'Reemplaza adjuntos desactualizados.', icon: 'refresh-cw' },
      { title: 'Limpiar PDFs', description: 'Elimina adjuntos innecesarios.', icon: 'trash-2' },
      { title: 'Organizar', description: 'Renombra adjuntos para mejor organizaciÃ³n.', icon: 'edit' },
    ],
    faq: [
      { question: 'Â¿Puedo reemplazar un adjunto?', answer: 'SÃ­, elimina el existente y aÃ±ade el nuevo.' },
      { question: 'Â¿Puedo cambiar el nombre?', answer: 'SÃ­, renombra cualquier adjunto.' },
      { question: 'Â¿Afecta el contenido del PDF?', answer: 'No, solo modifica los adjuntos.' },
    ],
  },

  'divide-pages': {
    title: 'Dividir PÃ¡ginas',
    metaDescription: 'Divide pÃ¡ginas PDF grandes en mÃºltiples pÃ¡ginas mÃ¡s pequeÃ±as.',
    description: '<p>Dividir PÃ¡ginas corta pÃ¡ginas PDF grandes en mÃºltiples pÃ¡ginas mÃ¡s pequeÃ±as.</p><p>Procesamiento local.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta el documento.' },
      { step: 2, title: 'Configura DivisiÃ³n', description: 'Selecciona cÃ³mo dividir las pÃ¡ginas.' },
      { step: 3, title: 'Divide y Descarga', description: 'Descarga el PDF con pÃ¡ginas divididas.' },
    ],
    useCases: [
      { title: 'Posters', description: 'Divide posters grandes para impresiÃ³n en partes.', icon: 'layout-grid' },
      { title: 'Planos', description: 'Divide planos grandes en secciones.', icon: 'map' },
      { title: 'Presentaciones', description: 'Divide diapositivas anchas en pÃ¡ginas estÃ¡ndar.', icon: 'presentation' },
    ],
    faq: [
      { question: 'Â¿CÃ³mo se dividen las pÃ¡ginas?', answer: 'Puedes dividir horizontal, vertical o en cuadrÃ­cula.' },
      { question: 'Â¿Puedo especificar el tamaÃ±o?', answer: 'SÃ­, define el tamaÃ±o de las pÃ¡ginas resultantes.' },
      { question: 'Â¿Se pierde contenido?', answer: 'No, todo el contenido se preserva en las pÃ¡ginas divididas.' },
    ],
  },

  'add-blank-page': {
    title: 'AÃ±adir PÃ¡gina en Blanco',
    metaDescription: 'Inserta pÃ¡ginas en blanco en documentos PDF.',
    description: '<p>AÃ±adir PÃ¡gina en Blanco te permite insertar pÃ¡ginas vacÃ­as en cualquier posiciÃ³n de tu documento PDF.</p><p>Procesamiento local.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta el documento.' },
      { step: 2, title: 'Selecciona PosiciÃ³n', description: 'Elige dÃ³nde insertar la pÃ¡gina en blanco.' },
      { step: 3, title: 'AÃ±ade y Descarga', description: 'Inserta la pÃ¡gina y descarga.' },
    ],
    useCases: [
      { title: 'Separadores', description: 'AÃ±ade pÃ¡ginas en blanco como separadores de secciÃ³n.', icon: 'file-plus' },
      { title: 'ImpresiÃ³n', description: 'AÃ±ade pÃ¡ginas para impresiÃ³n a doble cara.', icon: 'printer' },
      { title: 'Notas', description: 'Inserta pÃ¡ginas para notas manuscritas.', icon: 'edit' },
    ],
    faq: [
      { question: 'Â¿Puedo aÃ±adir mÃºltiples pÃ¡ginas?', answer: 'SÃ­, aÃ±ade tantas pÃ¡ginas en blanco como necesites.' },
      { question: 'Â¿Puedo elegir el tamaÃ±o?', answer: 'Las pÃ¡ginas en blanco coinciden con el tamaÃ±o del documento.' },
      { question: 'Â¿Puedo aÃ±adir al inicio o final?', answer: 'SÃ­, inserta en cualquier posiciÃ³n.' },
    ],
  },

  'reverse-pages': {
    title: 'Invertir PÃ¡ginas',
    metaDescription: 'Invierte el orden de las pÃ¡ginas en documentos PDF.',
    description: '<p>Invertir PÃ¡ginas cambia el orden de las pÃ¡ginas de tu PDF, poniendo la Ãºltima primero.</p><p>Procesamiento local.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta el documento.' },
      { step: 2, title: 'Confirma', description: 'Revisa la vista previa del orden invertido.' },
      { step: 3, title: 'Invierte y Descarga', description: 'Aplica la inversiÃ³n y descarga.' },
    ],
    useCases: [
      { title: 'Corregir Escaneos', description: 'Corrige documentos escaneados en orden inverso.', icon: 'refresh-cw' },
      { title: 'Presentaciones', description: 'Invierte el orden para presentaciones inversas.', icon: 'presentation' },
      { title: 'ImpresiÃ³n', description: 'Prepara documentos para ciertos tipos de impresiÃ³n.', icon: 'printer' },
    ],
    faq: [
      { question: 'Â¿Puedo invertir pÃ¡ginas especÃ­ficas?', answer: 'Esta herramienta invierte todas las pÃ¡ginas. Usa Organizar PDF para reordenar especÃ­ficas.' },
      { question: 'Â¿Afecta el contenido de las pÃ¡ginas?', answer: 'No, solo cambia el orden, no el contenido.' },
      { question: 'Â¿Es reversible?', answer: 'SÃ­, invierte de nuevo para restaurar el orden original.' },
    ],
  },

  'rotate-pdf': {
    title: 'Rotar PDF',
    metaDescription: 'Rota pÃ¡ginas PDF 90, 180 o 270 grados.',
    description: '<p>Rotar PDF te permite girar pÃ¡ginas de tu documento 90, 180 o 270 grados.</p><p>Procesamiento local.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta el documento.' },
      { step: 2, title: 'Selecciona RotaciÃ³n', description: 'Elige el Ã¡ngulo y las pÃ¡ginas a rotar.' },
      { step: 3, title: 'Rota y Descarga', description: 'Aplica la rotaciÃ³n y descarga.' },
    ],
    useCases: [
      { title: 'Corregir OrientaciÃ³n', description: 'Corrige pÃ¡ginas escaneadas con orientaciÃ³n incorrecta.', icon: 'rotate-cw' },
      { title: 'Documentos Mixtos', description: 'Unifica orientaciÃ³n en documentos con pÃ¡ginas mixtas.', icon: 'file-text' },
      { title: 'Presentaciones', description: 'Ajusta orientaciÃ³n para presentaciones.', icon: 'presentation' },
    ],
    faq: [
      { question: 'Â¿Puedo rotar pÃ¡ginas especÃ­ficas?', answer: 'SÃ­, selecciona las pÃ¡ginas a rotar.' },
      { question: 'Â¿QuÃ© Ã¡ngulos estÃ¡n disponibles?', answer: '90Â° (derecha), 180Â° (invertir), 270Â° (izquierda).' },
      { question: 'Â¿Afecta la calidad?', answer: 'No, la rotaciÃ³n no afecta la calidad del contenido.' },
    ],
  },

  'n-up-pdf': {
    title: 'N-Up PDF',
    metaDescription: 'Coloca mÃºltiples pÃ¡ginas PDF en una sola pÃ¡gina (2-up, 4-up, etc.).',
    description: '<p>N-Up PDF coloca mÃºltiples pÃ¡ginas de tu documento en una sola pÃ¡gina, Ãºtil para ahorrar papel al imprimir.</p><p>Procesamiento local.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta el documento.' },
      { step: 2, title: 'Selecciona DiseÃ±o', description: 'Elige 2-up, 4-up, 6-up o 9-up.' },
      { step: 3, title: 'Procesa y Descarga', description: 'Crea el PDF N-up y descarga.' },
    ],
    useCases: [
      { title: 'Ahorro de Papel', description: 'Imprime mÃºltiples pÃ¡ginas por hoja.', icon: 'file-minus' },
      { title: 'ResÃºmenes', description: 'Crea resÃºmenes visuales de documentos.', icon: 'layout-grid' },
      { title: 'RevisiÃ³n', description: 'Revisa documentos con vista general.', icon: 'eye' },
    ],
    faq: [
      { question: 'Â¿QuÃ© significa N-up?', answer: 'N pÃ¡ginas por hoja: 2-up = 2 pÃ¡ginas, 4-up = 4 pÃ¡ginas, etc.' },
      { question: 'Â¿Puedo personalizar el orden?', answer: 'SÃ­, elige el orden de lectura (izquierda-derecha, arriba-abajo).' },
      { question: 'Â¿Se reduce la calidad?', answer: 'Las pÃ¡ginas se escalan para ajustarse, pero mantienen legibilidad.' },
    ],
  },

  'combine-single-page': {
    title: 'Combinar en PÃ¡gina Ãšnica',
    metaDescription: 'Combina todas las pÃ¡ginas PDF en una sola pÃ¡gina larga.',
    description: '<p>Combinar en PÃ¡gina Ãšnica une todas las pÃ¡ginas de tu PDF en una sola pÃ¡gina larga continua.</p><p>Procesamiento local.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta el documento.' },
      { step: 2, title: 'Configura Opciones', description: 'Selecciona orientaciÃ³n y espaciado.' },
      { step: 3, title: 'Combina y Descarga', description: 'Crea la pÃ¡gina Ãºnica y descarga.' },
    ],
    useCases: [
      { title: 'InfografÃ­as', description: 'Crea documentos de desplazamiento continuo.', icon: 'scroll' },
      { title: 'ImpresiÃ³n de Banners', description: 'Prepara documentos para impresiÃ³n de banners.', icon: 'printer' },
      { title: 'VisualizaciÃ³n', description: 'Crea vistas panorÃ¡micas de documentos.', icon: 'maximize' },
    ],
    faq: [
      { question: 'Â¿Hay lÃ­mite de pÃ¡ginas?', answer: 'No hay lÃ­mite, pero documentos muy largos pueden ser difÃ­ciles de manejar.' },
      { question: 'Â¿Puedo aÃ±adir espacio entre pÃ¡ginas?', answer: 'SÃ­, configura el espaciado entre pÃ¡ginas originales.' },
      { question: 'Â¿Funciona con pÃ¡ginas de diferentes tamaÃ±os?', answer: 'SÃ­, las pÃ¡ginas se ajustan al ancho mÃ¡ximo.' },
    ],
  },

  'view-metadata': {
    title: 'Ver Metadatos',
    metaDescription: 'Visualiza los metadatos y propiedades de documentos PDF.',
    description: '<p>Ver Metadatos muestra toda la informaciÃ³n de propiedades de tu documento PDF.</p><p>Procesamiento local.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta el documento.' },
      { step: 2, title: 'Revisa Metadatos', description: 'Ve tÃ­tulo, autor, fechas, palabras clave, etc.' },
      { step: 3, title: 'Exporta si Necesitas', description: 'Exporta los metadatos a JSON.' },
    ],
    useCases: [
      { title: 'AuditorÃ­a', description: 'Revisa informaciÃ³n de documentos recibidos.', icon: 'search' },
      { title: 'VerificaciÃ³n', description: 'Verifica autor y fechas de documentos.', icon: 'check-circle' },
      { title: 'CatalogaciÃ³n', description: 'Extrae informaciÃ³n para catalogar documentos.', icon: 'database' },
    ],
    faq: [
      { question: 'Â¿QuÃ© metadatos se muestran?', answer: 'TÃ­tulo, autor, asunto, palabras clave, fechas de creaciÃ³n y modificaciÃ³n, productor, etc.' },
      { question: 'Â¿Puedo editar los metadatos?', answer: 'Usa la herramienta Editar Metadatos para modificarlos.' },
      { question: 'Â¿Se modifica el PDF?', answer: 'No, solo se visualiza la informaciÃ³n.' },
    ],
  },

  'edit-metadata': {
    title: 'Editar Metadatos',
    metaDescription: 'Edita los metadatos y propiedades de documentos PDF.',
    description: '<p>Editar Metadatos te permite modificar las propiedades de tu documento PDF como tÃ­tulo, autor y palabras clave.</p><p>Procesamiento local.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta el documento.' },
      { step: 2, title: 'Edita Metadatos', description: 'Modifica tÃ­tulo, autor, asunto, palabras clave.' },
      { step: 3, title: 'Guarda y Descarga', description: 'Aplica los cambios y descarga.' },
    ],
    useCases: [
      { title: 'Branding', description: 'AÃ±ade informaciÃ³n de empresa a documentos.', icon: 'building' },
      { title: 'SEO', description: 'Optimiza metadatos para bÃºsqueda.', icon: 'search' },
      { title: 'OrganizaciÃ³n', description: 'AÃ±ade palabras clave para catalogaciÃ³n.', icon: 'tag' },
    ],
    faq: [
      { question: 'Â¿QuÃ© metadatos puedo editar?', answer: 'TÃ­tulo, autor, asunto, palabras clave, productor y mÃ¡s.' },
      { question: 'Â¿Puedo eliminar metadatos?', answer: 'SÃ­, deja campos vacÃ­os o usa Eliminar Metadatos.' },
      { question: 'Â¿Afecta el contenido?', answer: 'No, solo modifica las propiedades del documento.' },
    ],
  },

  'pdf-to-zip': {
    title: 'PDFs a ZIP',
    metaDescription: 'Empaqueta mÃºltiples archivos PDF en un archivo ZIP.',
    description: '<p>PDFs a ZIP empaqueta mÃºltiples archivos PDF en un Ãºnico archivo ZIP comprimido.</p><p>Procesamiento local.</p>',
    howToUse: [
      { step: 1, title: 'Sube PDFs', description: 'Arrastra y suelta mÃºltiples archivos PDF.' },
      { step: 2, title: 'Configura Opciones', description: 'Selecciona nivel de compresiÃ³n.' },
      { step: 3, title: 'Crea y Descarga', description: 'Genera el archivo ZIP y descarga.' },
    ],
    useCases: [
      { title: 'EnvÃ­o por Correo', description: 'Empaqueta mÃºltiples PDFs para enviar por email.', icon: 'mail' },
      { title: 'Archivos', description: 'Comprime documentos para almacenamiento.', icon: 'archive' },
      { title: 'DistribuciÃ³n', description: 'Prepara paquetes de documentos para distribuciÃ³n.', icon: 'package' },
    ],
    faq: [
      { question: 'Â¿CuÃ¡ntos PDFs puedo empaquetar?', answer: 'Hasta 100 archivos PDF.' },
      { question: 'Â¿Se comprimen los PDFs?', answer: 'El ZIP comprime el paquete, no los PDFs individuales.' },
      { question: 'Â¿Puedo aÃ±adir otros archivos?', answer: 'Esta herramienta es especÃ­fica para PDFs.' },
    ],
  },

  'compare-pdfs': {
    title: 'Comparar PDFs',
    metaDescription: 'Compara dos documentos PDF lado a lado y resalta diferencias.',
    description: '<p>Comparar PDFs muestra dos documentos lado a lado y resalta las diferencias entre ellos.</p><p>Procesamiento local.</p>',
    howToUse: [
      { step: 1, title: 'Sube Dos PDFs', description: 'Arrastra y suelta los dos documentos a comparar.' },
      { step: 2, title: 'Revisa Diferencias', description: 'Ve las diferencias resaltadas.' },
      { step: 3, title: 'Exporta Resultados', description: 'Descarga el informe de comparaciÃ³n.' },
    ],
    useCases: [
      { title: 'Control de Versiones', description: 'Compara diferentes versiones de documentos.', icon: 'git-compare' },
      { title: 'RevisiÃ³n de Contratos', description: 'Identifica cambios en contratos.', icon: 'file-signature' },
      { title: 'AuditorÃ­a', description: 'Verifica cambios en documentos oficiales.', icon: 'search' },
    ],
    faq: [
      { question: 'Â¿QuÃ© diferencias detecta?', answer: 'Cambios en texto, imÃ¡genes, formato y estructura.' },
      { question: 'Â¿Funciona con PDFs escaneados?', answer: 'Mejor con PDFs de texto. Para escaneados, usa OCR primero.' },
      { question: 'Â¿Puedo comparar mÃ¡s de dos PDFs?', answer: 'Esta herramienta compara dos PDFs a la vez.' },
    ],
  },

  'posterize-pdf': {
    title: 'Posterizar PDF',
    metaDescription: 'Divide pÃ¡ginas PDF grandes en mÃºltiples pÃ¡ginas para impresiÃ³n de posters.',
    description: '<p>Posterizar PDF divide pÃ¡ginas grandes en mÃºltiples pÃ¡ginas mÃ¡s pequeÃ±as para imprimir posters en impresoras estÃ¡ndar.</p><p>Procesamiento local.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta el documento.' },
      { step: 2, title: 'Configura CuadrÃ­cula', description: 'Selecciona el nÃºmero de filas y columnas.' },
      { step: 3, title: 'Posteriza y Descarga', description: 'Crea las pÃ¡ginas divididas y descarga.' },
    ],
    useCases: [
      { title: 'Posters', description: 'Imprime posters grandes en hojas A4.', icon: 'maximize' },
      { title: 'Planos', description: 'Divide planos para impresiÃ³n en partes.', icon: 'map' },
      { title: 'Banners', description: 'Crea banners imprimibles en secciones.', icon: 'layout-grid' },
    ],
    faq: [
      { question: 'Â¿CÃ³mo funciona?', answer: 'Divide cada pÃ¡gina en una cuadrÃ­cula de pÃ¡ginas mÃ¡s pequeÃ±as.' },
      { question: 'Â¿Puedo aÃ±adir marcas de corte?', answer: 'SÃ­, aÃ±ade marcas de corte y superposiciÃ³n.' },
      { question: 'Â¿QuÃ© tamaÃ±o de cuadrÃ­cula puedo usar?', answer: 'Desde 2x2 hasta 10x10 o personalizado.' },
    ],
  },


  // ==================== OPTIMIZAR Y REPARAR ====================
  'fix-page-size': {
    title: 'Corregir TamaÃ±o de PÃ¡gina',
    metaDescription: 'Estandariza el tamaÃ±o de pÃ¡gina de documentos PDF.',
    description: '<p>Corregir TamaÃ±o de PÃ¡gina estandariza todas las pÃ¡ginas de tu PDF a un tamaÃ±o uniforme.</p><p>Procesamiento local.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta el documento.' },
      { step: 2, title: 'Selecciona TamaÃ±o', description: 'Elige el tamaÃ±o de pÃ¡gina deseado (A4, Letter, etc.).' },
      { step: 3, title: 'Aplica y Descarga', description: 'Estandariza las pÃ¡ginas y descarga.' },
    ],
    useCases: [
      { title: 'ImpresiÃ³n', description: 'Prepara documentos para impresiÃ³n uniforme.', icon: 'printer' },
      { title: 'CombinaciÃ³n', description: 'Estandariza antes de combinar documentos.', icon: 'combine' },
      { title: 'PresentaciÃ³n', description: 'Unifica tamaÃ±os para presentaciones profesionales.', icon: 'presentation' },
    ],
    faq: [
      { question: 'Â¿QuÃ© tamaÃ±os estÃ¡n disponibles?', answer: 'A4, Letter, Legal, A3, A5 y tamaÃ±os personalizados.' },
      { question: 'Â¿Se escala el contenido?', answer: 'Puedes elegir escalar, recortar o aÃ±adir mÃ¡rgenes.' },
      { question: 'Â¿Afecta la calidad?', answer: 'El contenido mantiene su calidad original.' },
    ],
  },

  'linearize-pdf': {
    title: 'Linearizar PDF',
    metaDescription: 'Optimiza PDFs para visualizaciÃ³n web rÃ¡pida (Fast Web View).',
    description: '<p>Linearizar PDF optimiza documentos para visualizaciÃ³n web rÃ¡pida, permitiendo ver la primera pÃ¡gina mientras se descarga el resto.</p><p>Procesamiento local.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta el documento.' },
      { step: 2, title: 'Confirma', description: 'Revisa las opciones de linearizaciÃ³n.' },
      { step: 3, title: 'Lineariza y Descarga', description: 'Optimiza el PDF y descarga.' },
    ],
    useCases: [
      { title: 'PublicaciÃ³n Web', description: 'Optimiza PDFs para sitios web.', icon: 'globe' },
      { title: 'Documentos Grandes', description: 'Mejora la experiencia con PDFs grandes.', icon: 'file-text' },
      { title: 'DistribuciÃ³n', description: 'Prepara documentos para distribuciÃ³n en lÃ­nea.', icon: 'share-2' },
    ],
    faq: [
      { question: 'Â¿QuÃ© es linearizaciÃ³n?', answer: 'Reorganiza el PDF para que la primera pÃ¡gina se muestre inmediatamente.' },
      { question: 'Â¿Reduce el tamaÃ±o?', answer: 'No significativamente, pero mejora la velocidad de visualizaciÃ³n.' },
      { question: 'Â¿Afecta la compatibilidad?', answer: 'No, los PDFs linearizados son compatibles con todos los lectores.' },
    ],
  },

  'page-dimensions': {
    title: 'Dimensiones de PÃ¡gina',
    metaDescription: 'Analiza y muestra las dimensiones de cada pÃ¡gina en documentos PDF.',
    description: '<p>Dimensiones de PÃ¡gina analiza y muestra el tamaÃ±o de cada pÃ¡gina en tu documento PDF.</p><p>Procesamiento local.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta el documento.' },
      { step: 2, title: 'Revisa Dimensiones', description: 'Ve el tamaÃ±o de cada pÃ¡gina.' },
      { step: 3, title: 'Exporta si Necesitas', description: 'Exporta el informe de dimensiones.' },
    ],
    useCases: [
      { title: 'VerificaciÃ³n', description: 'Verifica tamaÃ±os antes de imprimir.', icon: 'ruler' },
      { title: 'AnÃ¡lisis', description: 'Analiza documentos con pÃ¡ginas mixtas.', icon: 'search' },
      { title: 'PreparaciÃ³n', description: 'Identifica pÃ¡ginas que necesitan ajuste.', icon: 'settings' },
    ],
    faq: [
      { question: 'Â¿QuÃ© unidades se muestran?', answer: 'MilÃ­metros, pulgadas y puntos.' },
      { question: 'Â¿Detecta orientaciÃ³n?', answer: 'SÃ­, muestra si cada pÃ¡gina es vertical u horizontal.' },
      { question: 'Â¿Puedo cambiar las dimensiones?', answer: 'Usa Corregir TamaÃ±o de PÃ¡gina para modificar dimensiones.' },
    ],
  },

  'remove-restrictions': {
    title: 'Eliminar Restricciones',
    metaDescription: 'Elimina restricciones de seguridad de documentos PDF.',
    description: '<p>Eliminar Restricciones quita las restricciones de seguridad de PDFs que impiden copiar, imprimir o editar.</p><p>Procesamiento local.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta el documento restringido.' },
      { step: 2, title: 'Ingresa ContraseÃ±a', description: 'Si es necesario, ingresa la contraseÃ±a del propietario.' },
      { step: 3, title: 'Elimina y Descarga', description: 'Quita las restricciones y descarga.' },
    ],
    useCases: [
      { title: 'Imprimir Documentos', description: 'Habilita impresiÃ³n en PDFs restringidos.', icon: 'printer' },
      { title: 'Copiar Texto', description: 'Permite copiar texto de documentos bloqueados.', icon: 'copy' },
      { title: 'Editar PDFs', description: 'Habilita ediciÃ³n en documentos protegidos.', icon: 'edit' },
    ],
    faq: [
      { question: 'Â¿Necesito la contraseÃ±a?', answer: 'Depende del tipo de protecciÃ³n. Algunas restricciones requieren contraseÃ±a.' },
      { question: 'Â¿Es legal?', answer: 'Solo usa esta herramienta con documentos que tienes derecho a modificar.' },
      { question: 'Â¿Funciona con todos los PDFs?', answer: 'Funciona con la mayorÃ­a de PDFs con restricciones estÃ¡ndar.' },
    ],
  },

  'repair-pdf': {
    title: 'Reparar PDF',
    metaDescription: 'Repara archivos PDF daÃ±ados o corruptos.',
    description: '<p>Reparar PDF intenta recuperar y reparar archivos PDF daÃ±ados o corruptos.</p><p>Procesamiento local.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta el archivo daÃ±ado.' },
      { step: 2, title: 'Inicia ReparaciÃ³n', description: 'La herramienta analiza y repara el archivo.' },
      { step: 3, title: 'Descarga Reparado', description: 'Descarga el PDF reparado.' },
    ],
    useCases: [
      { title: 'Archivos Corruptos', description: 'Recupera PDFs que no se abren correctamente.', icon: 'wrench' },
      { title: 'Descargas Incompletas', description: 'Repara PDFs de descargas interrumpidas.', icon: 'download' },
      { title: 'Archivos Antiguos', description: 'Recupera documentos de archivos daÃ±ados.', icon: 'archive' },
    ],
    faq: [
      { question: 'Â¿QuÃ© problemas puede reparar?', answer: 'Estructura daÃ±ada, referencias rotas, objetos corruptos.' },
      { question: 'Â¿Siempre funciona?', answer: 'Depende del nivel de daÃ±o. Archivos muy daÃ±ados pueden no ser recuperables.' },
      { question: 'Â¿Se pierde contenido?', answer: 'La herramienta intenta preservar todo el contenido posible.' },
    ],
  },

  // ==================== SEGURIDAD PDF ====================
  'encrypt-pdf': {
    title: 'Cifrar PDF',
    metaDescription: 'Protege documentos PDF con contraseÃ±a y cifrado.',
    description: '<p>Cifrar PDF protege tus documentos con contraseÃ±a y cifrado AES para mÃ¡xima seguridad.</p><p>Procesamiento local.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta el documento.' },
      { step: 2, title: 'Configura Seguridad', description: 'Establece contraseÃ±a y permisos.' },
      { step: 3, title: 'Cifra y Descarga', description: 'Aplica el cifrado y descarga.' },
    ],
    useCases: [
      { title: 'Documentos Confidenciales', description: 'Protege informaciÃ³n sensible.', icon: 'lock' },
      { title: 'EnvÃ­o Seguro', description: 'Cifra documentos antes de enviar por email.', icon: 'mail' },
      { title: 'Cumplimiento', description: 'Cumple con requisitos de seguridad de datos.', icon: 'shield' },
    ],
    faq: [
      { question: 'Â¿QuÃ© cifrado se usa?', answer: 'AES de 128 o 256 bits, el estÃ¡ndar de la industria.' },
      { question: 'Â¿Puedo establecer permisos?', answer: 'SÃ­, controla impresiÃ³n, copia, ediciÃ³n y mÃ¡s.' },
      { question: 'Â¿QuÃ© pasa si olvido la contraseÃ±a?', answer: 'No hay forma de recuperar PDFs cifrados sin la contraseÃ±a.' },
    ],
  },

  'sanitize-pdf': {
    title: 'Sanitizar PDF',
    metaDescription: 'Elimina informaciÃ³n oculta y metadatos de documentos PDF.',
    description: '<p>Sanitizar PDF elimina toda la informaciÃ³n oculta, metadatos, scripts y datos sensibles de tus documentos.</p><p>Procesamiento local.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta el documento.' },
      { step: 2, title: 'Selecciona Opciones', description: 'Elige quÃ© elementos eliminar.' },
      { step: 3, title: 'Sanitiza y Descarga', description: 'Limpia el PDF y descarga.' },
    ],
    useCases: [
      { title: 'Privacidad', description: 'Elimina informaciÃ³n personal antes de compartir.', icon: 'shield' },
      { title: 'Seguridad', description: 'Quita scripts y elementos potencialmente peligrosos.', icon: 'alert-triangle' },
      { title: 'PublicaciÃ³n', description: 'Prepara documentos para publicaciÃ³n pÃºblica.', icon: 'globe' },
    ],
    faq: [
      { question: 'Â¿QuÃ© se elimina?', answer: 'Metadatos, comentarios, adjuntos, scripts, capas ocultas y mÃ¡s.' },
      { question: 'Â¿Afecta el contenido visible?', answer: 'No, solo elimina informaciÃ³n oculta.' },
      { question: 'Â¿Es reversible?', answer: 'No, guarda una copia del original.' },
    ],
  },

  'decrypt-pdf': {
    title: 'Descifrar PDF',
    metaDescription: 'Elimina la protecciÃ³n con contraseÃ±a de documentos PDF.',
    description: '<p>Descifrar PDF elimina la protecciÃ³n con contraseÃ±a de documentos PDF cifrados.</p><p>Procesamiento local.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta el documento cifrado.' },
      { step: 2, title: 'Ingresa ContraseÃ±a', description: 'Ingresa la contraseÃ±a del documento.' },
      { step: 3, title: 'Descifra y Descarga', description: 'Elimina el cifrado y descarga.' },
    ],
    useCases: [
      { title: 'Acceso a Documentos', description: 'Desbloquea PDFs para los que tienes la contraseÃ±a.', icon: 'unlock' },
      { title: 'Archivos', description: 'Elimina cifrado de documentos archivados.', icon: 'archive' },
      { title: 'Procesamiento', description: 'Prepara PDFs cifrados para otras operaciones.', icon: 'settings' },
    ],
    faq: [
      { question: 'Â¿Necesito la contraseÃ±a?', answer: 'SÃ­, necesitas la contraseÃ±a correcta para descifrar.' },
      { question: 'Â¿Puedo descifrar sin contraseÃ±a?', answer: 'No, esta herramienta requiere la contraseÃ±a legÃ­tima.' },
      { question: 'Â¿Se elimina toda la protecciÃ³n?', answer: 'SÃ­, el PDF resultante no tiene cifrado ni restricciones.' },
    ],
  },

  'flatten-pdf': {
    title: 'Aplanar PDF',
    metaDescription: 'Aplana formularios y anotaciones en documentos PDF.',
    description: '<p>Aplanar PDF convierte formularios interactivos y anotaciones en contenido estÃ¡tico no editable.</p><p>Procesamiento local.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta el documento.' },
      { step: 2, title: 'Selecciona Opciones', description: 'Elige quÃ© elementos aplanar.' },
      { step: 3, title: 'Aplana y Descarga', description: 'Convierte a estÃ¡tico y descarga.' },
    ],
    useCases: [
      { title: 'Formularios Completados', description: 'Convierte formularios rellenados en documentos finales.', icon: 'file-check' },
      { title: 'Archivos', description: 'Crea versiones permanentes de documentos anotados.', icon: 'archive' },
      { title: 'DistribuciÃ³n', description: 'Prepara documentos para distribuciÃ³n sin ediciÃ³n.', icon: 'share-2' },
    ],
    faq: [
      { question: 'Â¿QuÃ© se aplana?', answer: 'Campos de formulario, anotaciones, comentarios y capas.' },
      { question: 'Â¿Es reversible?', answer: 'No, guarda una copia del original con elementos editables.' },
      { question: 'Â¿Afecta la apariencia?', answer: 'No, el documento se ve igual pero los elementos son estÃ¡ticos.' },
    ],
  },

  'remove-metadata': {
    title: 'Eliminar Metadatos',
    metaDescription: 'Elimina todos los metadatos de documentos PDF.',
    description: '<p>Eliminar Metadatos quita toda la informaciÃ³n de propiedades de tus documentos PDF para proteger la privacidad.</p><p>Procesamiento local.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta el documento.' },
      { step: 2, title: 'Confirma', description: 'Revisa los metadatos a eliminar.' },
      { step: 3, title: 'Elimina y Descarga', description: 'Quita los metadatos y descarga.' },
    ],
    useCases: [
      { title: 'Privacidad', description: 'Elimina informaciÃ³n de autor y fechas.', icon: 'shield' },
      { title: 'AnonimizaciÃ³n', description: 'Prepara documentos para compartir anÃ³nimamente.', icon: 'user-x' },
      { title: 'PublicaciÃ³n', description: 'Limpia metadatos antes de publicar.', icon: 'globe' },
    ],
    faq: [
      { question: 'Â¿QuÃ© metadatos se eliminan?', answer: 'Autor, tÃ­tulo, asunto, palabras clave, fechas, productor, etc.' },
      { question: 'Â¿Afecta el contenido?', answer: 'No, solo elimina las propiedades del documento.' },
      { question: 'Â¿Es reversible?', answer: 'No, guarda una copia si necesitas los metadatos.' },
    ],
  },

  'change-permissions': {
    title: 'Cambiar Permisos',
    metaDescription: 'Modifica los permisos de seguridad de documentos PDF.',
    description: '<p>Cambiar Permisos te permite modificar quÃ© acciones estÃ¡n permitidas en tu documento PDF.</p><p>Procesamiento local.</p>',
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta el documento.' },
      { step: 2, title: 'Configura Permisos', description: 'Selecciona quÃ© acciones permitir o restringir.' },
      { step: 3, title: 'Aplica y Descarga', description: 'Guarda los nuevos permisos y descarga.' },
    ],
    useCases: [
      { title: 'Proteger Contenido', description: 'Restringe copia y ediciÃ³n de documentos.', icon: 'lock' },
      { title: 'Control de ImpresiÃ³n', description: 'Limita o permite impresiÃ³n.', icon: 'printer' },
      { title: 'DistribuciÃ³n', description: 'Configura permisos para distribuciÃ³n controlada.', icon: 'share-2' },
    ],
    faq: [
      { question: 'Â¿QuÃ© permisos puedo cambiar?', answer: 'ImpresiÃ³n, copia, ediciÃ³n, anotaciones, extracciÃ³n de pÃ¡ginas.' },
      { question: 'Â¿Necesito contraseÃ±a?', answer: 'Puedes establecer una contraseÃ±a de propietario para proteger los permisos.' },
      { question: 'Â¿Son los permisos seguros?', answer: 'Los permisos pueden ser eludidos con herramientas especializadas.' },
    ],
  },

  'pdf-to-pptx': {
    title: 'PDF a PowerPoint',
    metaDescription: 'Convierte PDF a presentaciÃ³n PowerPoint (PPTX). Cada pÃ¡gina se convierte en una diapositiva.',
    description: `
      <p>PDF a PowerPoint convierte tus documentos PDF en presentaciones de PowerPoint (PPTX) editables. Cada pÃ¡gina del PDF se transforma en una diapositiva de alta calidad, preservando el diseÃ±o visual.</p>
      <p>Ideal para convertir informes o documentos en formato de presentaciÃ³n.</p>
    `,
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Arrastra y suelta o selecciona el documento.' },
      { step: 2, title: 'Configura Calidad', description: 'Selecciona la calidad de imagen (DPI) de las diapositivas.' },
      { step: 3, title: 'Convierte y Descarga', description: 'Crea tu presentaciÃ³n PPTX y descarga.' },
    ],
    useCases: [
      { title: 'Crear Presentaciones', description: 'Convierte informes PDF en diapositivas para reuniones.', icon: 'presentation' },
      { title: 'Material de FormaciÃ³n', description: 'Transforma manuales PDF en presentaciones interactivas.', icon: 'book-open' },
      { title: 'Reutilizar Contenido', description: 'Usa contenido PDF existente en nuevas presentaciones.', icon: 'refresh-cw' },
    ],
    faq: [
      { question: 'Â¿Son editables las diapositivas?', answer: 'Cada diapositiva contiene una imagen de la pÃ¡gina. Puedes aÃ±adir elementos encima.' },
      { question: 'Â¿QuÃ© DPI debo usar?', answer: '150 DPI para pantalla, 300 DPI para impresiÃ³n.' },
      { question: 'Â¿Funciona con mÃºltiples pÃ¡ginas?', answer: 'SÃ­, cada pÃ¡gina se convierte en una diapositiva separada.' },
    ],
  },

  'pdf-to-excel': {
    title: 'PDF a Excel',
    metaDescription: 'Convierte PDF a hoja de cÃ¡lculo Excel. Extrae tablas a formato XLSX.',
    description: `
      <p>PDF a Excel convierte tus documentos PDF en hojas de cÃ¡lculo Microsoft Excel (XLSX) editables. La herramienta detecta automÃ¡ticamente las tablas en tu PDF y las extrae en hojas separadas.</p>
      <p>Ideal para analizar informes financieros, facturas o cualquier dato tabular.</p>
    `,
    howToUse: [
      { step: 1, title: 'Sube tu PDF', description: 'Sube el archivo PDF con tablas.' },
      { step: 2, title: 'Procesar', description: 'La herramienta identifica y extrae tablas automÃ¡ticamente.' },
      { step: 3, title: 'Descarga Excel', description: 'Descarga el archivo Excel con los datos extraÃ­dos.' },
    ],
    useCases: [
      { title: 'AnÃ¡lisis Financiero', description: 'Convierte estados de cuenta o facturas a Excel.', icon: 'trending-up' },
      { title: 'ExtracciÃ³n de Datos', description: 'Saca tablas de informes de investigaciÃ³n.', icon: 'database' },
      { title: 'GestiÃ³n de Inventario', description: 'Convierte listas de inventario de PDF a hoja de cÃ¡lculo.', icon: 'clipboard' },
    ],
    faq: [
      { question: 'Â¿CÃ³mo maneja las tablas?', answer: 'Las tablas detectadas se extraen a hojas correspondientes en el Excel.' },
      { question: 'Â¿Si no hay tablas?', answer: 'Se crea una hoja de informaciÃ³n indicando que no se encontraron tablas.' },
      { question: 'Â¿Se preserva el formato?', answer: 'Los datos se preservan, pero el formato visual complejo puede simplificarse.' },
    ],
  },

  'email-to-pdf': {
    title: 'Email a PDF',
    metaDescription: 'Convierte archivos de correo electrÃ³nico (.eml, .msg) a documentos PDF. Preserva formato, imÃ¡genes en lÃ­nea, enlaces clicables y adjuntos.',
    description: `
      <p>Email a PDF convierte tus archivos de correo electrÃ³nico (formatos .eml y .msg) en documentos PDF bien formateados. La herramienta preserva la informaciÃ³n del encabezado del correo, el contenido del cuerpo, imÃ¡genes en lÃ­nea con reemplazo CID, enlaces clicables e incrusta adjuntos directamente en el PDF.</p>
      <p>Personaliza las opciones de salida incluyendo tamaÃ±o de pÃ¡gina (A4, Letter, Legal), formato de fecha con soporte de zona horaria, y si incluir campos CC/BCC e informaciÃ³n de adjuntos.</p>
      <p>Toda la conversiÃ³n ocurre localmente en tu navegador, asegurando que tus correos permanezcan privados y seguros.</p>
    `,
    howToUse: [
      { step: 1, title: 'Subir Archivo de Email', description: 'Sube tu archivo de correo .eml o .msg.' },
      { step: 2, title: 'Configurar Opciones', description: 'Establece el tamaÃ±o de pÃ¡gina, formato de fecha, zona horaria y elige quÃ© campos incluir.' },
      { step: 3, title: 'Convertir y Descargar', description: 'Convierte a PDF con adjuntos incrustados y descarga el resultado.' },
    ],
    useCases: [
      { title: 'Registros Legales', description: 'Archiva correos importantes como PDF con adjuntos incrustados para documentaciÃ³n legal.', icon: 'scale' },
      { title: 'Archivos Empresariales', description: 'Convierte correspondencia empresarial a PDF para conservaciÃ³n a largo plazo.', icon: 'briefcase' },
      { title: 'PreservaciÃ³n de Evidencia', description: 'Guarda evidencia de correos con imÃ¡genes en lÃ­nea y adjuntos en formato PDF no editable.', icon: 'shield' },
    ],
    faq: [
      { question: 'Â¿QuÃ© formatos de email son compatibles?', answer: 'Tanto archivos .eml (RFC 822) como .msg (Microsoft Outlook) son totalmente compatibles.' },
      { question: 'Â¿Se incluyen los adjuntos?', answer: 'Â¡SÃ­! Los adjuntos se incrustan directamente en el archivo PDF. Puedes extraerlos del PDF usando un lector PDF compatible.' },
      { question: 'Â¿Se muestran las imÃ¡genes en lÃ­nea?', answer: 'SÃ­, las imÃ¡genes en lÃ­nea referenciadas vÃ­a CID (Content-ID) se convierten automÃ¡ticamente a URIs de datos base64 y se muestran en el PDF.' },
      { question: 'Â¿Los enlaces son clicables?', answer: 'SÃ­, todos los enlaces HTML (etiquetas <a>) y URLs en correos de texto plano se convierten en enlaces clicables en el PDF.' },
      { question: 'Â¿Se preserva el formato del email?', answer: 'SÃ­, los correos HTML mantienen su formato lo mÃ¡s posible, incluyendo estilos, imÃ¡genes y enlaces.' },
    ],
  },

  'djvu-to-pdf': {
    title: 'DJVU a PDF',
    metaDescription: 'Convierte archivos de documentos DJVU a PDF. Renderizado de alta calidad para documentos escaneados y libros.',
    description: `
      <p>DJVU a PDF convierte archivos de documentos DjVu en documentos PDF de alta calidad. DjVu es un formato de archivo informÃ¡tico diseÃ±ado principalmente para almacenar documentos escaneados, especialmente aquellos que contienen una combinaciÃ³n de texto, dibujos lineales y fotografÃ­as.</p>
      <p>Esta herramienta renderiza cada pÃ¡gina de tu archivo DJVU en el DPI elegido (puntos por pulgada) y los combina en un documento PDF buscable. Perfecto para convertir libros escaneados, manuales tÃ©cnicos y documentos de archivo.</p>
      <p>Toda la conversiÃ³n ocurre localmente en tu navegador, asegurando que tus documentos permanezcan privados y seguros.</p>
    `,
    howToUse: [
      { step: 1, title: 'Subir Archivo DJVU', description: 'Arrastra y suelta tu archivo .djvu o .djv, o haz clic para seleccionar desde tu dispositivo.' },
      { step: 2, title: 'Configurar Opciones', description: 'Elige el DPI de salida (72, 150 o 300) y la calidad de imagen para el PDF.' },
      { step: 3, title: 'Convertir y Descargar', description: 'Haz clic en Convertir a PDF y descarga tu documento convertido.' },
    ],
    useCases: [
      { title: 'Documentos de Archivo', description: 'Convierte archivos DJVU a formato PDF universal.', icon: 'archive' },
      { title: 'Compartir Libros Escaneados', description: 'Comparte libros escaneados en formato PDF para mayor compatibilidad.', icon: 'share-2' },
      { title: 'Imprimir Documentos', description: 'Convierte DJVU a PDF de alta calidad para impresiÃ³n.', icon: 'printer' },
    ],
    faq: [
      { question: 'Â¿QuÃ© es el formato DJVU?', answer: 'DjVu es un formato de archivo diseÃ±ado para almacenar documentos escaneados, especialmente aquellos con texto, dibujos e imÃ¡genes. Ofrece mejor compresiÃ³n que PDF para contenido escaneado.' },
      { question: 'Â¿QuÃ© DPI debo elegir?', answer: '72 DPI es adecuado para visualizaciÃ³n web, 150 DPI para documentos estÃ¡ndar y 300 DPI para impresiÃ³n de alta calidad.' },
      { question: 'Â¿El texto serÃ¡ buscable?', answer: 'El texto se renderizarÃ¡ como imÃ¡genes. Si necesitas texto buscable, considera usar nuestra herramienta OCR PDF despuÃ©s de la conversiÃ³n.' },
    ],
  },

  'fb2-to-pdf': {
    title: 'FB2 a PDF',
    metaDescription: 'Convierte libros electrÃ³nicos FictionBook (FB2) a PDF. Soporta mÃºltiples archivos con renderizado de alta calidad.',
    description: `
      <p>FB2 a PDF convierte archivos de libros electrÃ³nicos FictionBook (FB2) en documentos PDF de alta calidad. FB2 es un formato de libro electrÃ³nico basado en XML muy popular ampliamente utilizado en Rusia y Europa del Este.</p>
      <p>Esta herramienta soporta tanto archivos .fb2 como .fb2.zip, y puede procesar mÃºltiples archivos a la vez. Preserva el formato de texto, imÃ¡genes y la estructura de capÃ­tulos de tus libros electrÃ³nicos.</p>
      <p>Toda la conversiÃ³n ocurre localmente en tu navegador usando tecnologÃ­a de renderizado avanzada, asegurando que tus libros permanezcan privados y la conversiÃ³n sea rÃ¡pida.</p>
    `,
    howToUse: [
      { step: 1, title: 'Subir Archivos FB2', description: 'Arrastra y suelta uno o mÃ¡s archivos .fb2 o .fb2.zip, o haz clic para seleccionar desde tu dispositivo.' },
      { step: 2, title: 'Seleccionar Calidad', description: 'Elige la calidad de salida: Baja (72 DPI), Media (150 DPI) o Alta (300 DPI).' },
      { step: 3, title: 'Convertir y Descargar', description: 'Haz clic en Convertir a PDF y descarga tu(s) documento(s) convertido(s).' },
    ],
    useCases: [
      { title: 'Imprimir Libros ElectrÃ³nicos', description: 'Convierte libros electrÃ³nicos FB2 a PDF para impresiÃ³n fÃ­sica.', icon: 'printer' },
      { title: 'ConversiÃ³n por Lotes', description: 'Convierte mÃºltiples archivos FB2 a PDF a la vez.', icon: 'layers' },
      { title: 'Formato Universal', description: 'Comparte libros electrÃ³nicos en formato PDF que funciona en cualquier dispositivo.', icon: 'share-2' },
    ],
    faq: [
      { question: 'Â¿Puedo convertir mÃºltiples archivos FB2 a la vez?', answer: 'Â¡SÃ­! Esta herramienta soporta conversiÃ³n por lotes de hasta 20 archivos FB2 simultÃ¡neamente.' },
      { question: 'Â¿Se soportan archivos .fb2.zip?', answer: 'SÃ­, la herramienta extrae y convierte automÃ¡ticamente archivos FB2 desde archivos .fb2.zip.' },
      { question: 'Â¿Se preserva el formato?', answer: 'Â¡SÃ­! La herramienta usa renderizado nativo FB2, preservando el formato de texto, imÃ¡genes y estructura de capÃ­tulos con alta fidelidad.' },
    ],
  },

  'deskew-pdf': {
    title: 'Enderezar PDF',
    metaDescription: 'Endereza automÃ¡ticamente pÃ¡ginas PDF escaneadas o inclinadas. Corrige documentos sesgados con detecciÃ³n precisa de Ã¡ngulos.',
    description: `
      <p>Enderezar PDF detecta y corrige automÃ¡ticamente pÃ¡ginas inclinadas o sesgadas en tus documentos PDF usando anÃ¡lisis avanzado de varianza de perfil de proyecciÃ³n. Esto es esencial para documentos escaneados que se alimentaron al escÃ¡ner en un Ã¡ngulo.</p>
      <p>La herramienta analiza la alineaciÃ³n de texto y contenido en diferentes Ã¡ngulos para encontrar la rotaciÃ³n Ã³ptima, luego aplica la correcciÃ³n. Puedes ajustar el umbral de sensibilidad (1-30) y la configuraciÃ³n DPI (72-300) para obtener resultados Ã³ptimos.</p>
      <p>Todo el procesamiento ocurre localmente en tu navegador usando tecnologÃ­a WebAssembly, asegurando que tus documentos permanezcan privados y seguros.</p>
    `,
    howToUse: [
      { step: 1, title: 'Subir tu PDF', description: 'Arrastra y suelta tu archivo PDF escaneado o haz clic para seleccionar.' },
      { step: 2, title: 'Configurar Ajustes', description: 'Ajusta la sensibilidad del umbral y DPI si es necesario para una mejor detecciÃ³n.' },
      { step: 3, title: 'Procesar y Descargar', description: 'Haz clic en Enderezar para enderezar las pÃ¡ginas y descargar el PDF corregido.' },
    ],
    useCases: [
      { title: 'Documentos Escaneados', description: 'Corrige pÃ¡ginas que se escanearon en un Ã¡ngulo desde alimentadores de documentos.', icon: 'scan' },
      { title: 'Escaneos MÃ³viles', description: 'Corrige fotos inclinadas de documentos tomadas con smartphones.', icon: 'smartphone' },
      { title: 'RestauraciÃ³n de Archivos', description: 'Endereza archivos escaneados antiguos para mejor legibilidad.', icon: 'archive' },
    ],
    faq: [
      { question: 'Â¿QuÃ© tan precisa es la detecciÃ³n de Ã¡ngulos?', answer: 'La herramienta usa anÃ¡lisis de varianza de perfil de proyecciÃ³n para detectar Ã¡ngulos de sesgo de hasta Â±10 grados con alta precisiÃ³n. Omite automÃ¡ticamente pÃ¡ginas con Ã¡ngulos menores a 0.3 grados.' },
      { question: 'Â¿Se verÃ¡ afectada la calidad del texto?', answer: 'Para rotaciones en mÃºltiplos de 90 grados, no ocurre pÃ©rdida de calidad. Para otros Ã¡ngulos, la herramienta redondea al grado mÃ¡s cercano y mantiene buena calidad.' },
      { question: 'Â¿Puedo enderezar solo pÃ¡ginas especÃ­ficas?', answer: 'La herramienta analiza todas las pÃ¡ginas pero solo corrige aquellas con sesgo detectado por encima del umbral de sensibilidad. Las pÃ¡ginas con sesgo mÃ­nimo se dejan sin cambios.' },
      { question: 'Â¿QuÃ© es el umbral de sensibilidad?', answer: 'Los valores 1-10 corrigen solo inclinaciones obvias, 11-20 detectan sesgo moderado, y 21-30 capturan Ã¡ngulos sutiles. El predeterminado es 10 para detecciÃ³n equilibrada.' },
      { question: 'Â¿CuÃ¡nto tiempo toma el procesamiento?', answer: 'El tiempo de procesamiento depende del tamaÃ±o del archivo y DPI. 150 DPI (predeterminado) proporciona un buen equilibrio entre velocidad y precisiÃ³n. DPI mÃ¡s alto es mÃ¡s preciso pero mÃ¡s lento.' },
    ],
  },

  'pdf-to-pdfa': {
    title: 'PDF a PDF/A',
    metaDescription: 'Convierte PDF a formato de archivo PDF/A. Asegura la preservaciÃ³n de documentos a largo plazo con estÃ¡ndares ISO.',
    description: `
      <p>PDF a PDF/A convierte tus documentos PDF al formato PDF/A, el estÃ¡ndar ISO para archivo de documentos a largo plazo. PDF/A asegura que los documentos serÃ¡n visibles y reproducibles durante dÃ©cadas.</p>
      <p>Elige entre PDF/A-1b (conformidad bÃ¡sica), PDF/A-2b (recomendado, soporta transparencia) o PDF/A-3b (permite archivos incrustados). La herramienta incrusta fuentes y aplana la transparencia segÃºn sea necesario.</p>
      <p>Toda la conversiÃ³n ocurre localmente en tu navegador, asegurando que tus documentos permanezcan privados.</p>
    `,
    howToUse: [
      { step: 1, title: 'Subir tu PDF', description: 'Sube el PDF que deseas convertir a PDF/A.' },
      { step: 2, title: 'Seleccionar Nivel PDF/A', description: 'Elige el nivel de conformidad PDF/A-1b, PDF/A-2b o PDF/A-3b.' },
      { step: 3, title: 'Convertir y Descargar', description: 'Convierte a PDF/A y descarga el documento de archivo.' },
    ],
    useCases: [
      { title: 'Archivos Legales', description: 'Convierte documentos legales a PDF/A para almacenamiento a largo plazo admisible en tribunales.', icon: 'scale' },
      { title: 'Registros Gubernamentales', description: 'Cumple con los requisitos de archivo gubernamental usando PDF/A.', icon: 'building' },
      { title: 'Archivos Empresariales', description: 'Preserva documentos empresariales importantes para accesibilidad futura.', icon: 'archive' },
    ],
    faq: [
      { question: 'Â¿QuÃ© nivel de PDF/A debo usar?', answer: 'PDF/A-2b es recomendado para la mayorÃ­a de usos. Usa 1b para mÃ¡xima compatibilidad o 3b si necesitas archivos incrustados.' },
      { question: 'Â¿QuÃ© hace diferente a PDF/A?', answer: 'PDF/A incrusta fuentes, deshabilita el cifrado y asegura que todos los elementos sean autocontenidos para visualizaciÃ³n futura.' },
      { question: 'Â¿Puedo convertir de vuelta desde PDF/A?', answer: 'Los archivos PDF/A son PDFs estÃ¡ndar y se pueden abrir normalmente. Las caracterÃ­sticas de archivo agregan restricciones, no limitaciones.' },
    ],
  },

  'digital-sign-pdf': {
    title: 'Firma Digital',
    metaDescription: 'AÃ±ade firmas digitales X.509 a documentos PDF. Firma PDFs con certificados PFX, P12 o PEM para validez legal.',
    description: '<p>La herramienta de Firma Digital te permite aÃ±adir firmas digitales X.509 criptogrÃ¡ficas a documentos PDF.</p>',
    howToUse: [
      { step: 1, title: 'Subir PDF', description: 'Sube el documento PDF que deseas firmar digitalmente.' },
      { step: 2, title: 'Cargar Certificado', description: 'Sube tu archivo de certificado X.509 (.pfx, .p12 o .pem) e ingresa la contraseÃ±a.' },
      { step: 3, title: 'Firmar y Descargar', description: 'Haz clic en Firmar PDF para aplicar la firma digital y descarga el documento firmado.' },
    ],
    useCases: [
      { title: 'Documentos Legales', description: 'Firma contratos y documentos legales con firmas digitales legalmente vinculantes.', icon: 'scale' },
      { title: 'Aprobaciones Empresariales', description: 'Firma digitalmente facturas y documentos de aprobaciÃ³n para pistas de auditorÃ­a.', icon: 'briefcase' },
      { title: 'Integridad del Documento', description: 'Asegura que los documentos no han sido alterados despuÃ©s de firmar.', icon: 'shield-check' },
    ],
    faq: [
      { question: 'Â¿QuÃ© formatos de certificado son compatibles?', answer: 'Se admiten los formatos de certificado PFX (.pfx), PKCS#12 (.p12) y PEM (.pem).' },
      { question: 'Â¿La firma es legalmente vÃ¡lida?', answer: 'SÃ­, las firmas digitales X.509 con un certificado vÃ¡lido son legalmente reconocidas en la mayorÃ­a de jurisdicciones.' },
      { question: 'Â¿Puedo aÃ±adir una firma visible?', answer: 'SÃ­, puedes aÃ±adir una firma visible con texto, imagen, posiciÃ³n y estilo personalizados.' },
    ],
  },

  'validate-signature': {
    title: 'Validar Firma',
    metaDescription: 'Verifica firmas digitales en documentos PDF. Comprueba la validez del certificado, informaciÃ³n del firmante e integridad del documento.',
    description: '<p>La herramienta Validar Firma te permite verificar firmas digitales en documentos PDF.</p>',
    howToUse: [
      { step: 1, title: 'Subir PDF Firmado', description: 'Sube un documento PDF que contenga firmas digitales.' },
      { step: 2, title: 'Ver Resultados', description: 'Ve todas las firmas encontradas en el documento con su estado de validez.' },
      { step: 3, title: 'Exportar Informe', description: 'Opcionalmente descarga un informe JSON de los resultados de validaciÃ³n.' },
    ],
    useCases: [
      { title: 'VerificaciÃ³n de Documentos', description: 'Verifica que los documentos firmados son autÃ©nticos y no han sido alterados.', icon: 'shield-check' },
      { title: 'AuditorÃ­a de Cumplimiento', description: 'Comprueba la validez de las firmas para propÃ³sitos de cumplimiento y auditorÃ­a.', icon: 'clipboard-check' },
      { title: 'RevisiÃ³n de Certificados', description: 'Ve los detalles del certificado y fechas de expiraciÃ³n de documentos firmados.', icon: 'award' },
    ],
    faq: [
      { question: 'Â¿QuÃ© significa "vÃ¡lido"?', answer: 'Una firma vÃ¡lida significa que el documento no ha sido modificado desde la firma y la cadena de certificados estÃ¡ intacta.' },
      { question: 'Â¿Puedo validar mÃºltiples PDFs?', answer: 'SÃ­, puedes subir mÃºltiples PDFs y validar todas las firmas en lote.' },
      { question: 'Â¿Por quÃ© una firma podrÃ­a ser invÃ¡lida?', answer: 'Las firmas pueden ser invÃ¡lidas si el documento fue modificado, el certificado expirÃ³ o el certificado no es de confianza.' },
    ],
  },
};
