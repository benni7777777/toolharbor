/**
 * Deutsche Tool-Inhalte fÃ¼r SEO
 * EnthÃ¤lt detaillierte Beschreibungen, Anleitungen, AnwendungsfÃ¤lle und FAQs fÃ¼r alle Tools
 */

import { ToolContent } from '@/types/tool';

/**
 * Deutsche Tool-Inhalts-Map
 * Jedes Tool enthÃ¤lt: title, metaDescription, keywords, description, howToUse, useCases, faq
 */
export const toolContentDe: Record<string, ToolContent> = {
  // ==================== POPULÃ„RE TOOLS ====================
  'pdf-multi-tool': {
    title: 'PDF Multi-Tool',
    metaDescription: 'All-in-One PDF-Editor: PDF zusammenfÃ¼gen, teilen, organisieren, Seiten lÃ¶schen, drehen und extrahieren in einem Tool.',
    description: `
      <p>Das PDF Multi-Tool ist Ihre KomplettlÃ¶sung fÃ¼r alle Aufgaben der PDF-Seitenverwaltung. Dieses leistungsstarke All-in-One-Tool kombiniert mehrere PDF-Operationen in einer intuitiven BenutzeroberflÃ¤che und spart Ihnen Zeit und MÃ¼he.</p>
      <p>Ob Sie mehrere Dokumente zusammenfÃ¼gen, ein groÃŸes PDF in kleinere Dateien aufteilen, Seiten neu organisieren, unerwÃ¼nschte Inhalte lÃ¶schen, Seiten drehen oder bestimmte Abschnitte extrahieren mÃ¼ssen â€“ dieses Tool erledigt alles, ohne dass Sie zwischen verschiedenen Anwendungen wechseln mÃ¼ssen.</p>
      <p>Die gesamte Verarbeitung findet direkt in Ihrem Browser statt, was die PrivatsphÃ¤re und Sicherheit Ihrer Dokumente gewÃ¤hrleistet. Es werden keine Dateien auf einen Server hochgeladen.</p>
    `,
    howToUse: [
      { step: 1, title: 'PDF hochladen', description: 'Ziehen Sie Ihre PDF-Datei per Drag & Drop in den Upload-Bereich oder klicken Sie, um Dateien von Ihrem GerÃ¤t auszuwÃ¤hlen.' },
      { step: 2, title: 'Operation wÃ¤hlen', description: 'WÃ¤hlen Sie aus den verfÃ¼gbaren Operationen: ZusammenfÃ¼gen, Teilen, Organisieren, Seiten lÃ¶schen, Drehen oder Extrahieren.' },
      { step: 3, title: 'Optionen konfigurieren', description: 'Passen Sie die spezifischen Einstellungen an, wie z. B. Seitenbereiche, Drehwinkel oder die Reihenfolge beim ZusammenfÃ¼gen.' },
      { step: 4, title: 'Verarbeiten und Herunterladen', description: 'Klicken Sie auf die SchaltflÃ¤che zum Verarbeiten und laden Sie Ihre modifizierte PDF-Datei herunter.' },
    ],
    useCases: [
      { title: 'Dokumentenvorbereitung', description: 'Bereiten Sie Unterlagen fÃ¼r die Einreichung vor, indem Sie unnÃ¶tige Seiten entfernen und mehrere Dateien kombinieren.', icon: 'file-check' },
      { title: 'Berichtserstellung', description: 'FÃ¼gen Sie verschiedene Berichtsabschnitte zusammen und organisieren Sie Kapitel zu einem professionellen Gesamtdokument.', icon: 'book-open' },
      { title: 'Archivverwaltung', description: 'Teilen Sie groÃŸe Archivdateien in handliche Abschnitte auf und extrahieren Sie relevante Seiten.', icon: 'archive' },
    ],
    faq: [
      { question: 'Wie viele PDFs kann ich gleichzeitig verarbeiten?', answer: 'Sie kÃ¶nnen bis zu 10 PDF-Dateien gleichzeitig hochladen und verarbeiten, mit einer maximalen GesamtgrÃ¶ÃŸe von 500 MB.' },
      { question: 'Bleiben meine Lesezeichen erhalten?', answer: 'Ja, beim ZusammenfÃ¼gen von PDFs bleiben vorhandene Lesezeichen erhalten und kÃ¶nnen optional in einer einheitlichen Struktur kombiniert werden.' },
      { question: 'Gibt es ein Seitenlimit?', answer: 'Es gibt kein striktes Seitenlimit. Das Tool kann Dokumente mit hunderten von Seiten verarbeiten, wobei sehr groÃŸe Dateien etwas lÃ¤nger dauern kÃ¶nnen.' },
    ],
  },

  'merge-pdf': {
    title: 'PDF zusammenfÃ¼gen',
    metaDescription: 'Kombinieren Sie mehrere PDF-Dateien zu einem Dokument. Kostenloser Online-PDF-Merger mit Drag-and-Drop-Sortierung.',
    description: `
      <p>Mit "PDF zusammenfÃ¼gen" kÃ¶nnen Sie mehrere PDF-Dokumente schnell und einfach zu einer einzigen Datei kombinieren. Ob Sie Berichte konsolidieren, gescannte Dokumente verbinden oder eine PrÃ¤sentation zusammenstellen â€“ dieses Tool macht den Prozess nahtlos.</p>
      <p>Laden Sie einfach Ihre Dateien hoch, ordnen Sie sie per Drag & Drop in der gewÃ¼nschten Reihenfolge an und fÃ¼gen Sie sie zusammen. Das Tool bewahrt die QualitÃ¤t Ihrer Originaldateien.</p>
    `,
    howToUse: [
      { step: 1, title: 'Dateien hochladen', description: 'Ziehen Sie mehrere PDF-Dateien in den Bereich oder wÃ¤hlen Sie sie manuell aus.' },
      { step: 2, title: 'Reihenfolge anordnen', description: 'Verschieben Sie die Miniaturansichten, um die gewÃ¼nschte Abfolge festzulegen.' },
      { step: 3, title: 'ZusammenfÃ¼gen', description: 'Klicken Sie auf "ZusammenfÃ¼gen" und laden Sie das fertige Dokument herunter.' },
    ],
    useCases: [
      { title: 'Berichte kombinieren', description: 'FÃ¼gen Sie Monats- oder Quartalsberichte zu einem Jahresdokument zusammen.', icon: 'file-text' },
      { title: 'Portfolios erstellen', description: 'Kombinieren Sie Arbeitsproben, Zertifikate und Anschreiben zu einem professionellen Portfolio.', icon: 'briefcase' },
      { title: 'Rechnungen bÃ¼ndeln', description: 'Fassen Sie mehrere Belege oder Rechnungen fÃ¼r die Buchhaltung in einer Datei zusammen.', icon: 'receipt' },
    ],
    faq: [
      { question: 'Wie viele PDFs kann ich verbinden?', answer: 'Sie kÃ¶nnen bis zu 100 PDF-Dateien auf einmal mit einer GesamtgrÃ¶ÃŸe von bis zu 500 MB zusammenfÃ¼gen.' },
      { question: 'Bleibt die QualitÃ¤t erhalten?', answer: 'Ja, der Prozess erfolgt ohne QualitÃ¤tsverlust oder zusÃ¤tzliche Kompression.' },
      { question: 'Kann ich passwortgeschÃ¼tzte PDFs zusammenfÃ¼gen?', answer: 'Diese mÃ¼ssen zuerst entschlÃ¼sselt werden. Nutzen Sie dafÃ¼r unser Tool "PDF entschlÃ¼sseln".' },
    ],
  },

  'rotate-custom': {
    title: 'Eigener Drehwinkel',
    metaDescription: 'PDF-Seiten um jeden beliebigen Winkel drehen. PrÃ¤zise Ausrichtung fÃ¼r schief gescannte Dokumente.',
    description: `
      <p>Dieses Tool gibt Ihnen prÃ¤zise Kontrolle Ã¼ber die Ausrichtung Ihrer PDF-Seiten. Im Gegensatz zu Standard-Tools, die nur 90-Grad-Schritte unterstÃ¼tzen, kÃ¶nnen Sie hier jeden spezifischen Winkel eingeben.</p>
      <p>Ideal zum Begradigen von Dokumenten, die schrÃ¤g eingezogen wurden, oder zum Anpassen von technischen Zeichnungen.</p>
    `,
    howToUse: [
      { step: 1, title: 'PDF hochladen', description: 'Laden Sie die PDF-Datei hoch, deren Seiten gedreht werden mÃ¼ssen.' },
      { step: 2, title: 'Winkel einstellen', description: 'Geben Sie den exakten Grad fÃ¼r die Drehung ein.' },
      { step: 3, title: 'Vorschau und Download', description: 'PrÃ¼fen Sie die Ausrichtung in der Echtzeit-Vorschau und speichern Sie das Ergebnis.' },
    ],
    useCases: [
      { title: 'Gescannte Dokumente', description: 'Begradigen Sie Seiten, die schrÃ¤g durch den Scanner gelaufen sind.', icon: 'scan' },
      { title: 'Technische Zeichnungen', description: 'Passen Sie die Ausrichtung von PlÃ¤nen prÃ¤zise an.', icon: 'ruler' },
      { title: 'Kreative Layouts', description: 'Erstellen Sie kÃ¼nstlerische Layouts durch individuelle Drehung.', icon: 'pen-tool' },
    ],
    faq: [
      { question: 'Sind Dezimalzahlen mÃ¶glich?', answer: 'Aktuell unterstÃ¼tzen wir ganzzahlige Gradangaben, arbeiten aber an einer UnterstÃ¼tzung fÃ¼r Dezimalstellen.' },
      { question: 'Wird der Inhalt abgeschnitten?', answer: 'Nein, die SeitengrÃ¶ÃŸe wird automatisch angepasst, damit der gedrehte Inhalt vollstÃ¤ndig sichtbar bleibt.' },
      { question: 'Kann ich nur eine einzelne Seite drehen?', answer: 'Ja, Sie kÃ¶nnen fÃ¼r jede Seite einen individuellen Winkel festlegen.' },
    ],
  },

  'grid-combine': {
    title: 'Rasterkombination PDF',
    metaDescription: 'Kombinieren Sie mehrere PDF-Dateien auf einzelnen Seiten mit einem flexiblen Rasterlayout. Ordnen Sie 2, 4, 6, 9 oder mehr PDFs pro Seite mit RÃ¤ndern und AbstÃ¤nden an.',
    description: `
      <p>Das Rasterkombinations-Tool bietet eine einzigartige MÃ¶glichkeit, mehrere separate PDF-Dateien auf einzelnen Seiten zusammenzufÃ¼hren. Im Gegensatz zum Standard-Tool "PDF zusammenfÃ¼hren", das einfach Seiten anhÃ¤ngt, oder dem "N-Up"-Tool, das Seiten aus einem einzelnen Dokument neu anordnet, nimmt Rasterkombination mehrere Eingabedateien und ordnet sie nebeneinander in einem anpassbaren Rasterlayout an.</p>
      <p>Sie kÃ¶nnen aus verschiedenen Rasterkonfigurationen wie 2x1, 2x2, 3x3 usw. wÃ¤hlen. Dies ist perfekt fÃ¼r den Vergleich mehrerer Dokumente, das Erstellen von Handzetteln aus verschiedenen Quellen oder das Drucken kompakter Versionen mehrerer Dateien.</p>
      <p>Passen Sie die Ausgabe an, indem Sie SeitengrÃ¶ÃŸe, Ausrichtung, RÃ¤nder, AbstÃ¤nde und Rahmen steuern. Die gesamte Verarbeitung erfolgt lokal in Ihrem Browser fÃ¼r maximale PrivatsphÃ¤re.</p>
    `,
    howToUse: [
      { step: 1, title: 'PDF-Dateien hochladen', description: 'Laden Sie zwei oder mehr PDF-Dateien hoch, die Sie kombinieren mÃ¶chten. Sie kÃ¶nnen sie in der gewÃ¼nschten Reihenfolge neu anordnen.' },
      { step: 2, title: 'Rasterlayout wÃ¤hlen', description: 'WÃ¤hlen Sie Ihr gewÃ¼nschtes Rasterlayout (z.B. 2x2 fÃ¼r 4 Dateien pro Seite, 3x3 fÃ¼r 9 Dateien pro Seite).' },
      { step: 3, title: 'Aussehen anpassen', description: 'Passen Sie Einstellungen wie SeitengrÃ¶ÃŸe (A4, Letter), Ausrichtung, Abstand zwischen Elementen und RÃ¤nder an.' },
      { step: 4, title: 'Kombinieren und herunterladen', description: 'Klicken Sie auf "PDFs kombinieren", um Ihr neues Rasterlayout-Dokument zu generieren und das Ergebnis herunterzuladen.' },
    ],
    useCases: [
      { title: 'Visueller Vergleich', description: 'Platzieren Sie verschiedene Versionen eines Designs oder Dokuments nebeneinander auf einer einzelnen Seite fÃ¼r einen einfachen Vergleich.', icon: 'layout-grid' },
      { title: 'Handzettel drucken', description: 'Kombinieren Sie mehrere kurze Dokumente oder Folien auf einem Blatt Papier, um Druckkosten zu sparen.', icon: 'printer' },
      { title: 'Portfolio-Erstellung', description: 'PrÃ¤sentieren Sie mehrere Projektdateien in einer sauberen, organisierten RasterÃ¼bersicht.', icon: 'image' },
    ],
    faq: [
      { question: 'Wie unterscheidet sich das von N-Up?', answer: 'N-Up nimmt Seiten aus EINEM PDF und setzt sie auf ein Blatt. Rasterkombination nimmt MEHRERE VERSCHIEDENE PDF-Dateien und setzt sie auf ein Blatt.' },
      { question: 'Wie viele Dateien kann ich kombinieren?', answer: 'Sie kÃ¶nnen je nach Browserspeicher bis zu 100 Dateien kombinieren, aber Layouts wie 4x4 bieten Platz fÃ¼r bis zu 16 Dateien pro Seite.' },
      { question: 'Kann ich RÃ¤nder hinzufÃ¼gen?', answer: 'Ja, Sie kÃ¶nnen RÃ¤nder um jede PDF-Datei hinzufÃ¼gen und die Rahmenfarbe anpassen.' },
    ],
  },

  'split-pdf': {
    title: 'PDF teilen',
    metaDescription: 'PDF-Dateien in mehrere Dokumente aufteilen. Extrahieren Sie einzelne Seiten oder teilen Sie nach Bereichen.',
    description: `
      <p>Mit "PDF teilen" kÃ¶nnen Sie ein einzelnes PDF in mehrere kleinere Dateien aufteilen. Perfekt, um Kapitel zu extrahieren oder kombinierte Dokumente wieder zu trennen.</p>
    `,
    howToUse: [
      { step: 1, title: 'PDF hochladen', description: 'WÃ¤hlen Sie das PDF aus, das Sie aufteilen mÃ¶chten.' },
      { step: 2, title: 'Methode wÃ¤hlen', description: 'WÃ¤hlen Sie zwischen Seitenbereichen, Einzel-Extraktion oder Aufteilung in festen Intervallen.' },
      { step: 3, title: 'Teilen und Speichern', description: 'Klicken Sie auf "Teilen" und laden Sie die Ergebnisse (ggf. als ZIP) herunter.' },
    ],
    useCases: [
      { title: 'Kapitel extrahieren', description: 'Teilen Sie ein Buch in einzelne Kapitel auf.', icon: 'book' },
      { title: 'Sammelscans trennen', description: 'Trennen Sie einen Stapelscan in die ursprÃ¼nglichen Einzeldokumente.', icon: 'copy' },
      { title: 'Handouts erstellen', description: 'Extrahieren Sie nur die relevanten Folien einer PrÃ¤sentation.', icon: 'presentation' },
    ],
    faq: [
      { question: 'Kann ich das PDF in jede einzelne Seite zerlegen?', answer: 'Ja, wÃ¤hlen Sie die Option "Jede Seite einzeln speichern".' },
      { question: 'Bleiben Lesezeichen erhalten?', answer: 'Lesezeichen, die auf die extrahierten Seiten verweisen, bleiben in der neuen Datei bestehen.' },
      { question: 'Wie erhalte ich die Dateien?', answer: 'Bei mehreren Dateien werden diese bequem in einem ZIP-Archiv zusammengefasst.' },
    ],
  },

  'compress-pdf': {
    title: 'PDF komprimieren',
    metaDescription: 'PDF-DateigrÃ¶ÃŸe reduzieren bei gleichbleibender QualitÃ¤t. Online-PDF-Kompressor fÃ¼r kleinere Dateien.',
    description: `
      <p>Dieses Tool reduziert die DateigrÃ¶ÃŸe Ihrer PDFs, ideal fÃ¼r E-Mail-AnhÃ¤nge oder Web-Uploads. Sie kÃ¶nnen zwischen verschiedenen Kompressionsstufen wÃ¤hlen.</p>
    `,
    howToUse: [
      { step: 1, title: 'PDF hochladen', description: 'WÃ¤hlen Sie die Datei aus, die verkleinert werden soll.' },
      { step: 2, title: 'Stufe wÃ¤hlen', description: 'WÃ¤hlen Sie: Niedrig (Beste QualitÃ¤t), Mittel (Ausbalanciert) oder Hoch (Kleinste Datei).' },
      { step: 3, title: 'Komprimieren', description: 'Starten Sie den Vorgang und laden Sie die optimierte PDF herunter.' },
    ],
    useCases: [
      { title: 'E-Mail-AnhÃ¤nge', description: 'Unterschreiten Sie GrÃ¶ÃŸenlimits von Mail-Anbietern.', icon: 'mail' },
      { title: 'Web-VerÃ¶ffentlichung', description: 'Schnellere Ladezeiten fÃ¼r Dokumente auf Ihrer Website.', icon: 'globe' },
      { title: 'Speicherplatz sparen', description: 'Archivieren Sie Dokumente platzsparend auf Ihrer Festplatte.', icon: 'hard-drive' },
    ],
    faq: [
      { question: 'Wie stark wird die Datei verkleinert?', answer: 'Das hÃ¤ngt vom Inhalt ab. Bilder kÃ¶nnen oft um 50-80% verkleinert werden, reiner Text weniger.' },
      { question: 'Leidet die TextqualitÃ¤t?', answer: 'Nein, Text bleibt scharf. Die Kompression wirkt sich primÃ¤r auf Bilder und Grafiken aus.' },
      { question: 'Ist die Nutzung sicher?', answer: 'Ja, die Kompression erfolgt lokal in Ihrem Browser; Ihre Daten verlassen Ihr GerÃ¤t nicht.' },
    ],
  },

  'edit-pdf': {
    title: 'PDF bearbeiten',
    metaDescription: 'PDF-Dateien online bearbeiten. Text, Bilder, Anmerkungen und Formen hinzufÃ¼gen.',
    description: `
      <p>Unser PDF-Editor bietet Ihnen Werkzeuge zum Ã„ndern und Kommentieren Ihrer Dokumente â€“ ganz ohne teure Software. FÃ¼gen Sie Text, Bilder, Formen und Markierungen hinzu.</p>
    `,
    howToUse: [
      { step: 1, title: 'PDF hochladen', description: 'WÃ¤hlen Sie das zu bearbeitende Dokument aus.' },
      { step: 2, title: 'Werkzeug wÃ¤hlen', description: 'Nutzen Sie die Toolbar fÃ¼r Text, Highlights, Formen oder Bilder.' },
      { step: 3, title: 'Ã„nderungen vornehmen', description: 'Platzieren und gestalten Sie die Elemente direkt auf dem PDF.' },
      { step: 4, title: 'Speichern', description: 'Laden Sie die bearbeitete Version herunter.' },
    ],
    useCases: [
      { title: 'DokumentenprÃ¼fung', description: 'Kommentieren und markieren Sie EntwÃ¼rfe im Team.', icon: 'message-square' },
      { title: 'Formulare ausfÃ¼llen', description: 'Beschriften Sie PDFs und fÃ¼gen Sie Unterschriften hinzu.', icon: 'edit-3' },
      { title: 'SchwÃ¤rzen', description: 'Ãœberdecken Sie sensible Informationen vor der Weitergabe.', icon: 'eye-off' },
    ],
    faq: [
      { question: 'Kann ich den Originaltext lÃ¶schen?', answer: 'Dieses Tool dient primÃ¤r dem HinzufÃ¼gen von Inhalten. Zum direkten LÃ¶schen von Originaltext ist oft das Quelldokument (z.B. Word) nÃ¶tig.' },
      { question: 'Sind die Ã„nderungen dauerhaft?', answer: 'Ja, nach dem Speichern werden die Anmerkungen fest in die PDF-Ebenen integriert.' },
      { question: 'Gibt es eine RÃ¼ckgÃ¤ngig-Funktion?', answer: 'Ja, wÃ¤hrend der Bearbeitung kÃ¶nnen Sie Schritte jederzeit rÃ¼ckgÃ¤ngig machen.' },
    ],
  },

  'jpg-to-pdf': {
    title: 'JPG in PDF',
    metaDescription: 'Konvertieren Sie JPG-Bilder in PDF. Mehrere JPG-Dateien zu einem PDF-Dokument zusammenfassen.',
    description: `
      <p>Wandeln Sie Ihre JPEG-Bilder schnell in PDF-Dokumente um. Sie kÃ¶nnen einzelne Fotos oder ganze Bildserien konvertieren und die Seitenreihenfolge anpassen.</p>
    `,
    howToUse: [
      { step: 1, title: 'Bilder hochladen', description: 'WÃ¤hlen Sie eine oder mehrere JPG-Dateien aus.' },
      { step: 2, title: 'Anordnen', description: 'Bringen Sie die Bilder per Drag & Drop in die richtige Reihenfolge.' },
      { step: 3, title: 'Konvertieren', description: 'Erstellen Sie das PDF und laden Sie es herunter.' },
    ],
    useCases: [
      { title: 'Fotoalben', description: 'Erstellen Sie ein PDF-Album aus Urlaubs- oder Eventfotos.', icon: 'image' },
      { title: 'Belege digitalisieren', description: 'Wandeln Sie Handyfotos von Quittungen in saubere PDFs um.', icon: 'camera' },
      { title: 'Portfolio', description: 'Fassen Sie Design-Arbeiten in einem kompakten Dokument zusammen.', icon: 'folder' },
    ],
    faq: [
      { question: 'Wie viele Bilder sind mÃ¶glich?', answer: 'Sie kÃ¶nnen bis zu 100 Bilder in ein einzelnes PDF umwandeln.' },
      { question: 'Bleibt die BildqualitÃ¤t hoch?', answer: 'Ja, die Bilder werden in ihrer OriginalqualitÃ¤t eingebettet.' },
      { question: 'Kann ich die SeitengrÃ¶ÃŸe wÃ¤hlen?', answer: 'Ja, Sie kÃ¶nnen zwischen OriginalgrÃ¶ÃŸe, A4 oder US-Letter wÃ¤hlen.' },
    ],
  },

  'sign-pdf': {
    title: 'PDF unterschreiben',
    metaDescription: 'Elektronische Unterschriften zu PDF-Dokumenten hinzufÃ¼gen. Zeichnen, tippen oder Signatur hochladen.',
    description: `
      <p>FÃ¼gen Sie Ihre Unterschrift sicher und schnell zu PDFs hinzu. Zeichnen Sie Ihre Signatur mit der Maus/Touchpad, tippen Sie sie ein oder laden Sie ein Bild Ihrer Unterschrift hoch.</p>
    `,
    howToUse: [
      { step: 1, title: 'PDF hochladen', description: 'WÃ¤hlen Sie das zu unterzeichnende Dokument.' },
      { step: 2, title: 'Signatur erstellen', description: 'Zeichnen, tippen oder laden Sie Ihre Unterschrift hoch.' },
      { step: 3, title: 'Platzieren', description: 'Klicken Sie an die Stelle im PDF, an der die Signatur erscheinen soll.' },
    ],
    useCases: [
      { title: 'VertrÃ¤ge signieren', description: 'Unterschreiben Sie VertrÃ¤ge ohne lÃ¤stiges Drucken und Scannen.', icon: 'file-signature' },
      { title: 'Formulare', description: 'BestÃ¤tigen Sie AntrÃ¤ge oder EinverstÃ¤ndniserklÃ¤rungen digital.', icon: 'clipboard' },
      { title: 'Freigabeprozesse', description: 'Geben Sie Dokumente im beruflichen Umfeld schnell frei.', icon: 'check-circle' },
    ],
    faq: [
      { question: 'Ist die Signatur rechtsgÃ¼ltig?', answer: 'In den meisten LÃ¤ndern sind elektronische Signaturen fÃ¼r StandardvertrÃ¤ge rechtlich bindend. FÃ¼r notarielle Dokumente gelten Sonderregeln.' },
      { question: 'Wird meine Signatur gespeichert?', answer: 'Sie kÃ¶nnen sie optional lokal im Browser speichern, um sie beim nÃ¤chsten Mal direkt wiederzuverwenden.' },
      { question: 'Kann ich mehrere Stellen signieren?', answer: 'Ja, Sie kÃ¶nnen die Signatur beliebig oft auf verschiedenen Seiten platzieren.' },
    ],
  },

  'crop-pdf': {
    title: 'PDF zuschneiden',
    metaDescription: 'PDF-Seiten zuschneiden, um RÃ¤nder zu entfernen. PDF-Dokumente prÃ¤zise trimmen.',
    description: `
      <p>Entfernen Sie weiÃŸe RÃ¤nder oder unerwÃ¼nschte Bereiche von Ihren PDF-Seiten. Ideal, um den Fokus auf den wesentlichen Inhalt zu legen oder Seitenformate zu vereinheitlichen.</p>
    `,
    howToUse: [
      { step: 1, title: 'PDF hochladen', description: 'WÃ¤hlen Sie das PDF aus, das Sie zuschneiden mÃ¶chten.' },
      { step: 2, title: 'Bereich wÃ¤hlen', description: 'Ziehen Sie den Rahmen auf die gewÃ¼nschte GrÃ¶ÃŸe.' },
      { step: 3, title: 'Anwenden', description: 'WÃ¤hlen Sie aus, ob alle Seiten oder nur bestimmte Seiten beschnitten werden sollen.' },
    ],
    useCases: [
      { title: 'RÃ¤nder entfernen', description: 'Trimmen Sie Ã¼berflÃ¼ssigen Platz bei Scans.', icon: 'maximize-2' },
      { title: 'Inhalt fokussieren', description: 'Entfernen Sie Kopf- oder FuÃŸzeilen fÃ¼r eine bessere Lesbarkeit.', icon: 'target' },
      { title: 'Format-Korrektur', description: 'Bringen Sie alle Seiten auf eine einheitliche GrÃ¶ÃŸe.', icon: 'square' },
    ],
    faq: [
      { question: 'Geht der Inhalt verloren?', answer: 'Ja, alles auÃŸerhalb des gewÃ¤hlten Rahmens wird entfernt. Behalten Sie das Original als Backup.' },
      { question: 'Kann ich jede Seite anders zuschneiden?', answer: 'Ja, Sie kÃ¶nnen fÃ¼r jede Seite oder Seitengruppen individuelle Schnittmasken festlegen.' },
      { question: 'Bleibt die TextqualitÃ¤t gleich?', answer: 'Ja, da nur der Sichtbereich geÃ¤ndert wird, bleibt die QualitÃ¤t der Vektoren und Bilder unberÃ¼hrt.' },
    ],
  },

  'extract-pages': {
    title: 'Seiten extrahieren',
    metaDescription: 'Bestimmte Seiten aus einer PDF extrahieren und als neues Dokument speichern.',
    description: `
      <p>WÃ¤hlen Sie gezielt Seiten aus einem groÃŸen Dokument aus und erstellen Sie daraus eine neue, kompakte Datei. Ideal fÃ¼r AuszÃ¼ge aus BÃ¼chern oder Berichten.</p>
    `,
    howToUse: [
      { step: 1, title: 'PDF hochladen', description: 'WÃ¤hlen Sie das Quelldokument aus.' },
      { step: 2, title: 'Seiten wÃ¤hlen', description: 'Klicken Sie auf die Miniaturansichten der Seiten, die Sie behalten mÃ¶chten.' },
      { step: 3, title: 'Extrahieren', description: 'Klicken Sie auf "Extrahieren" und laden Sie das neue PDF herunter.' },
    ],
    useCases: [
      { title: 'AuszÃ¼ge erstellen', description: 'Speichern Sie nur relevante Kapitel eines Handbuchs.', icon: 'file-minus' },
      { title: 'Gezielte Weitergabe', description: 'Teilen Sie nur die Seiten, die fÃ¼r den EmpfÃ¤nger wichtig sind.', icon: 'share-2' },
      { title: 'Archivierung', description: 'Sichern Sie nur die wichtigsten Seiten eines langen Dokuments.', icon: 'archive' },
    ],
    faq: [
      { question: 'Kann ich nicht-aufeinanderfolgende Seiten wÃ¤hlen?', answer: 'Ja, Sie kÃ¶nnen beliebige Seiten im Dokument anklicken, egal an welcher Stelle sie stehen.' },
      { question: 'Bleiben Links in der Datei aktiv?', answer: 'Ja, interne und externe Links auf den extrahierten Seiten bleiben funktionsfÃ¤hig.' },
      { question: 'Wird das Original verÃ¤ndert?', answer: 'Nein, es wird eine neue Datei erstellt; Ihr Original bleibt unberÃ¼hrt.' },
    ],
  },

  'organize-pdf': {
    title: 'PDF organisieren',
    metaDescription: 'Seitenreihenfolge Ã¤ndern, Seiten duplizieren oder lÃ¶schen. PDF-Dokumente einfach neu strukturieren.',
    description: `
      <p>Strukturieren Sie Ihre PDF-Dokumente vÃ¶llig neu. Mit einer einfachen Drag-and-Drop-OberflÃ¤che kÃ¶nnen Sie Seiten verschieben, lÃ¶schen oder wichtige Abschnitte duplizieren.</p>
    `,
    howToUse: [
      { step: 1, title: 'PDF hochladen', description: 'WÃ¤hlen Sie die Datei aus, die Sie neu ordnen mÃ¶chten.' },
      { step: 2, title: 'Sortieren', description: 'Verschieben Sie die Seiten per Maus. Nutzen Sie die Buttons zum LÃ¶schen oder Kopieren.' },
      { step: 3, title: 'Speichern', description: 'Laden Sie das organisierte Dokument herunter.' },
    ],
    useCases: [
      { title: 'Scan-Fehler korrigieren', description: 'Bringen Sie falsch herum eingescannte Seiten in die richtige Reihenfolge.', icon: 'arrow-up-down' },
      { title: 'Eigene Struktur', description: 'Erstellen Sie eine individuelle Abfolge fÃ¼r PrÃ¤sentationen.', icon: 'list' },
      { title: 'Bereinigen', description: 'Entfernen Sie Leerseiten oder doppelte Inhalte sofort.', icon: 'trash-2' },
    ],
    faq: [
      { question: 'Kann ich Seiten duplizieren?', answer: 'Ja, jede Seite kann mit einem Klick kopiert und an eine andere Stelle verschoben werden.' },
      { question: 'Gibt es eine Vorschau?', answer: 'Ja, Sie sehen groÃŸe Vorschaubilder aller Seiten, was das Sortieren erleichtert.' },
      { question: 'Bleibt die DateigrÃ¶ÃŸe gleich?', answer: 'Meistens ja, auÃŸer Sie fÃ¼gen viele Duplikate hinzu oder lÃ¶schen viele Seiten.' },
    ],
  },

  'delete-pages': {
    title: 'Seiten lÃ¶schen',
    metaDescription: 'UnerwÃ¼nschte Seiten aus PDF-Dateien entfernen. Einfaches AuswÃ¤hlen und LÃ¶schen.',
    description: `
      <p>Entfernen Sie schnell und unkompliziert nicht benÃ¶tigte Seiten aus Ihren PDFs. Ob Leerseiten, veraltete Inhalte oder sensible Daten â€“ mit diesem Tool bereinigen Sie Ihre Dokumente in Sekunden.</p>
    `,
    howToUse: [
      { step: 1, title: 'PDF hochladen', description: 'WÃ¤hlen Sie das Dokument aus, das bereinigt werden soll.' },
      { step: 2, title: 'Seiten wÃ¤hlen', description: 'Markieren Sie die Seiten, die entfernt werden sollen.' },
      { step: 3, title: 'LÃ¶schen und Speichern', description: 'BestÃ¤tigen Sie das LÃ¶schen und laden Sie die gekÃ¼rzte PDF herunter.' },
    ],
    useCases: [
      { title: 'Leerseiten entfernen', description: 'Bereinigen Sie Dokumente von versehentlich mitgescannten Leerseiten.', icon: 'file-x' },
      { title: 'Datenschutz', description: 'LÃ¶schen Sie Seiten mit vertraulichen Infos, bevor Sie den Rest teilen.', icon: 'shield' },
      { title: 'Veraltete Inhalte', description: 'Entfernen Sie nicht mehr aktuelle Abschnitte aus HandbÃ¼chern.', icon: 'filter' },
    ],
    faq: [
      { question: 'Ist das LÃ¶schen endgÃ¼ltig?', answer: 'In der heruntergeladenen Datei ja. Ihr lokales Original auf dem PC bleibt jedoch unverÃ¤ndert.' },
      { question: 'Kann ich mehrere Seiten gleichzeitig lÃ¶schen?', answer: 'Ja, Sie kÃ¶nnen beliebig viele Seiten markieren und in einem Schritt entfernen.' },
      { question: 'Was passiert mit dem Inhaltsverzeichnis?', answer: 'Die Seitenzahlen im Dokument bleiben meist gleich, aber Links zu gelÃ¶schten Seiten funktionieren nicht mehr.' },
    ],
  },

  'ocr-pdf': {
    title: 'PDF mit OCR erkennen',
    metaDescription: 'Gescannte PDFs durchsuchbar machen. Text aus Bildern und Scans extrahieren.',
    description: `
      <p>Verwandeln Sie statische Scans in intelligente Dokumente. Unsere OCR-Technologie erkennt Text in Bildern und fÃ¼gt eine unsichtbare, durchsuchbare Textebene hinzu.</p>
    `,
    howToUse: [
      { step: 1, title: 'Scan hochladen', description: 'WÃ¤hlen Sie ein bildbasiertes PDF aus.' },
      { step: 2, title: 'Sprache wÃ¤hlen', description: 'WÃ¤hlen Sie die Sprache des Dokuments fÃ¼r optimale Ergebnisse.' },
      { step: 3, title: 'OCR starten', description: 'Laden Sie das nun durchsuchbare und kopierbare PDF herunter.' },
    ],
    useCases: [
      { title: 'Archive digitalisieren', description: 'Machen Sie alte Papierarchive per Volltextsuche findbar.', icon: 'archive' },
      { title: 'Text kopieren', description: 'Kopieren Sie Text aus Dokumenten, die nur als Bild vorliegen.', icon: 'type' },
      { title: 'Barrierefreiheit', description: 'Machen Sie Scans fÃ¼r Screenreader lesbar.', icon: 'accessibility' },
    ],
    faq: [
      { question: 'Welche Sprachen werden unterstÃ¼tzt?', answer: 'Ãœber 100 Sprachen, darunter Deutsch, Englisch, FranzÃ¶sisch und Spanisch.' },
      { question: 'Wie gut ist die Erkennung?', answer: 'Bei sauberen Scans liegt die Genauigkeit oft Ã¼ber 98%.' },
      { question: 'Bleibt das Aussehen gleich?', answer: 'Ja, das visuelle Erscheinungsbild bleibt exakt identisch.' },
    ],
  },

  'pdf-to-docx': {
    title: 'PDF in Word',
    metaDescription: 'PDF in editierbare Word-Dokumente (DOCX) umwandeln. Layout und Formatierung bleiben erhalten.',
    description: `
      <p>Konvertieren Sie PDF-Dokumente in vollstÃ¤ndig editierbare Microsoft Word-Dateien. Layouts, Schriftarten und Bilder werden so originalgetreu wie mÃ¶glich Ã¼bernommen.</p>
    `,
    howToUse: [
      { step: 1, title: 'PDF wÃ¤hlen', description: 'Laden Sie das Dokument hoch.' },
      { step: 2, title: 'Konvertierung', description: 'Warten Sie kurz, wÃ¤hrend die Struktur analysiert wird.' },
      { step: 3, title: 'Word-Datei laden', description: 'Bearbeiten Sie den Text nun direkt in Word oder Google Docs.' },
    ],
    useCases: [
      { title: 'VertrÃ¤ge anpassen', description: 'PDF-VertrÃ¤ge in Word Ã¤ndern und neu verhandeln.', icon: 'file-text' },
      { title: 'Lebenslauf aktualisieren', description: 'Bringen Sie alte PDF-LebenslÃ¤ufe ohne Tipparbeit auf den neuesten Stand.', icon: 'user' },
      { title: 'DatenÃ¼bernahme', description: 'Ãœbernehmen Sie komplexe Texte in Ihre eigene Textverarbeitung.', icon: 'copy' },
    ],
    faq: [
      { question: 'Wird die Formatierung Ã¼bernommen?', answer: 'Wir geben unser Bestes, Spalten, Tabellen und Bilder exakt zu platzieren.' },
      { question: 'Funktioniert das bei Scans?', answer: 'FÃ¼r Scans empfehlen wir zuerst unser OCR-Tool fÃ¼r bessere Textergebnisse.' },
      { question: 'Ist das Ergebnis mit Google Docs kompatibel?', answer: 'Ja, die erstellte DOCX-Datei lÃ¤sst sich problemlos dort Ã¶ffnen.' },
    ],
  },
  // ==================== EDIT & ANNOTATE (Fortsetzung) ====================
  'bookmark': {
    title: 'Lesezeichen bearbeiten',
    metaDescription: 'PDF-Lesezeichen hinzufÃ¼gen, bearbeiten und verwalten. Erstellen Sie eine Navigationsstruktur fÃ¼r Ihre Dokumente.',
    description: `
      <p>Mit "Lesezeichen bearbeiten" kÃ¶nnen Sie Lesezeichen in Ihren PDF-Dokumenten erstellen, Ã¤ndern und organisieren. Lesezeichen ermÃ¶glichen eine schnelle Navigation zu bestimmten Abschnitten, was die Nutzung langer Dokumente erheblich erleichtert.</p>
      <p>Sie kÃ¶nnen neue Lesezeichen hinzufÃ¼gen, die Hierarchie neu organisieren oder Lesezeichen aus externen Quellen importieren. Dieses Tool ist unerlÃ¤sslich fÃ¼r die Erstellung professioneller, navigierbarer Dokumente.</p>
    `,
    howToUse: [
      { step: 1, title: 'PDF hochladen', description: 'WÃ¤hlen Sie die PDF-Datei aus, deren Lesezeichen Sie verwalten mÃ¶chten.' },
      { step: 2, title: 'Lesezeichen verwalten', description: 'FÃ¼gen Sie neue Punkte hinzu, benennen Sie bestehende um oder ziehen Sie diese per Drag & Drop in eine hierarchische Ordnung.' },
      { step: 3, title: 'Speichern und Download', description: 'Ãœbernehmen Sie die Ã„nderungen und laden Sie das PDF mit der neuen Navigationsstruktur herunter.' },
    ],
    useCases: [
      { title: 'Navigation erstellen', description: 'Helfen Sie Lesern, sich in langen Dokumenten schnell zurechtzufinden.', icon: 'navigation' },
      { title: 'Kapitel organisieren', description: 'Spiegeln Sie die Kapitelstruktur Ihres Dokuments in den Lesezeichen wider.', icon: 'book-open' },
      { title: 'Barrierefreiheit verbessern', description: 'Machen Sie Dokumente benutzerfreundlicher und zugÃ¤nglicher.', icon: 'accessibility' },
    ],
    faq: [
      { question: 'Kann ich verschachtelte Lesezeichen erstellen?', answer: 'Ja, Sie kÃ¶nnen eine Baumstruktur mit Haupt- und Unterlesezeichen erstellen.' },
      { question: 'Werden die Lesezeichen Ã¼berall angezeigt?', answer: 'Ja, Lesezeichen sind ein PDF-Standard und werden von allen gÃ¤ngigen Readern und Browsern unterstÃ¼tzt.' },
      { question: 'Kann ich Lesezeichen importieren?', answer: 'Ja, das Tool unterstÃ¼tzt den Import von Strukturen aus JSON- oder Textdateien.' },
    ],
  },

  'table-of-contents': {
    title: 'Inhaltsverzeichnis erstellen',
    metaDescription: 'Generieren Sie ein Inhaltsverzeichnis fÃ¼r Ihr PDF. Erstellen Sie anklickbare Navigation aus Lesezeichen.',
    description: `
      <p>Dieses Tool generiert eine navigierbare Inhaltsverzeichnisseite fÃ¼r Ihre PDF-Dokumente. Das Verzeichnis kann aus vorhandenen Lesezeichen oder benutzerdefinierten EintrÃ¤gen erstellt werden.</p>
      <p>Passen Sie das Erscheinungsbild mit verschiedenen Stilen und Layouts an. Das generierte Verzeichnis enthÃ¤lt anklickbare Links, die direkt zu den entsprechenden Seiten springen.</p>
    `,
    howToUse: [
      { step: 1, title: 'PDF hochladen', description: 'WÃ¤hlen Sie das Dokument aus, fÃ¼r das ein Inhaltsverzeichnis benÃ¶tigt wird.' },
      { step: 2, title: 'TOC konfigurieren', description: 'WÃ¤hlen Sie Stil, Schriftart und Position. Entscheiden Sie, ob Lesezeichen als Basis dienen sollen.' },
      { step: 3, title: 'Generieren', description: 'Erstellen Sie das Inhaltsverzeichnis und laden Sie die aktualisierte PDF herunter.' },
    ],
    useCases: [
      { title: 'Akademische Arbeiten', description: 'FÃ¼gen Sie Abschlussarbeiten oder Forschungsberichten ein professionelles Verzeichnis hinzu.', icon: 'graduation-cap' },
      { title: 'GeschÃ¤ftsberichte', description: 'Erstellen Sie Ã¼bersichtliche Berichte fÃ¼r Stakeholder mit klarer Sektionsauflistung.', icon: 'bar-chart' },
      { title: 'BenutzerhandbÃ¼cher', description: 'Generieren Sie umfassende Indizes fÃ¼r technische Dokumentationen.', icon: 'book' },
    ],
    faq: [
      { question: 'Ist das Verzeichnis interaktiv?', answer: 'Ja, jeder Eintrag ist ein Link, der den Leser direkt zur Zielseite fÃ¼hrt.' },
      { question: 'Wo wird das Verzeichnis eingefÃ¼gt?', answer: 'StandardmÃ¤ÃŸig am Anfang des Dokuments, Sie kÃ¶nnen den Ort aber individuell festlegen.' },
      { question: 'Kann ich das Design anpassen?', answer: 'Ja, es stehen verschiedene Layout-Vorlagen zur VerfÃ¼gung.' },
    ],
  },

  'page-numbers': {
    title: 'Seitenzahlen hinzufÃ¼gen',
    metaDescription: 'Seitenzahlen zu PDF-Dokumenten hinzufÃ¼gen. Position, Format und Startnummer individuell anpassen.',
    description: `
      <p>FÃ¼gen Sie Ihren PDFs professionelle Seitenzahlen hinzu. WÃ¤hlen Sie aus verschiedenen Formaten, Positionen und Stilen, um das Layout Ihres Dokuments zu perfektionieren.</p>
    `,
    howToUse: [
      { step: 1, title: 'PDF hochladen', description: 'Laden Sie das Dokument hoch, das nummeriert werden soll.' },
      { step: 2, title: 'Formatierung wÃ¤hlen', description: 'Bestimmen Sie Position (z.B. unten rechts), Startnummer und das Zahlenformat.' },
      { step: 3, title: 'Anwenden', description: 'FÃ¼gen Sie die Paginierung hinzu und laden Sie das Ergebnis herunter.' },
    ],
    useCases: [
      { title: 'Professionelle Berichte', description: 'Stellen Sie sicher, dass Ihre Business-Dokumente eine korrekte Paginierung haben.', icon: 'file-text' },
      { title: 'Rechtliche Dokumente', description: 'FÃ¼gen Sie VertrÃ¤gen fÃ¼r eine bessere Referenzierung Seitenzahlen hinzu.', icon: 'scale' },
      { title: 'Skripte und Manuskripte', description: 'Organisieren Sie Ihre EntwÃ¼rfe durch eine durchgehende Nummerierung.', icon: 'graduation-cap' },
    ],
    faq: [
      { question: 'Kann ich die erste Seite auslassen?', answer: 'Ja, Sie kÃ¶nnen festlegen, dass die Nummerierung erst ab einer bestimmten Seite (z.B. nach dem Deckblatt) beginnt.' },
      { question: 'Welche Formate gibt es?', answer: 'Arabische Zahlen (1, 2, 3), rÃ¶mische Zahlen (i, ii, iii) oder das Format "Seite X von Y".' },
      { question: 'Kann ich die Schriftart Ã¤ndern?', answer: 'Ja, Sie kÃ¶nnen SchriftgrÃ¶ÃŸe und Typ an Ihr Dokument anpassen.' },
    ],
  },

  'add-watermark': {
    title: 'Wasserzeichen hinzufÃ¼gen',
    metaDescription: 'Text- oder Bild-Wasserzeichen zu PDFs hinzufÃ¼gen. SchÃ¼tzen und branden Sie Ihre Dokumente.',
    description: `
      <p>SchÃ¼tzen Sie Ihr geistiges Eigentum, indem Sie Text- oder Bild-Wasserzeichen auf Ihre PDFs setzen. Ideal fÃ¼r Statusanzeigen wie "Entwurf" oder zur Kennzeichnung mit Ihrem Firmenlogo.</p>
    `,
    howToUse: [
      { step: 1, title: 'PDF hochladen', description: 'WÃ¤hlen Sie das zu schÃ¼tzende Dokument aus.' },
      { step: 2, title: 'Wasserzeichen erstellen', description: 'Geben Sie Text ein oder laden Sie ein Logo hoch. Passen Sie Transparenz und Winkel an.' },
      { step: 3, title: 'Platzieren und Speichern', description: 'Wenden Sie das Wasserzeichen auf alle oder ausgewÃ¤hlte Seiten an.' },
    ],
    useCases: [
      { title: 'Urheberschutz', description: 'Versehen Sie Bilder oder Dokumente mit einem Copyright-Vermerk.', icon: 'copyright' },
      { title: 'Status-Kennzeichnung', description: 'Markieren Sie Dokumente deutlich als "KOPIE", "ENTWURF" oder "VERTRAULICH".', icon: 'shield' },
      { title: 'Corporate Identity', description: 'Integrieren Sie Ihr Firmenlogo dezent im Hintergrund Ihrer Unterlagen.', icon: 'award' },
    ],
    faq: [
      { question: 'Kann ich die Transparenz einstellen?', answer: 'Ja, Sie kÃ¶nnen das Wasserzeichen fast unsichtbar oder deckend einstellen.' },
      { question: 'Werden alle Seiten markiert?', answer: 'Sie kÃ¶nnen wÃ¤hlen: Alle Seiten, nur die erste Seite oder ein benutzerdefinierter Bereich.' },
      { question: 'Kann ich Bilder (PNG/JPG) nutzen?', answer: 'Ja, sowohl Text als auch Bilddateien (inkl. Transparenz) werden unterstÃ¼tzt.' },
    ],
  },

  'header-footer': {
    title: 'Kopf- & FuÃŸzeile',
    metaDescription: 'Kopf- und FuÃŸzeilen zu PDF hinzufÃ¼gen. Seitenzahlen, Daten und eigenen Text einfÃ¼gen.',
    description: `
      <p>Erstellen Sie ein einheitliches Layout fÃ¼r Ihre PDFs, indem Sie Kopf- und FuÃŸzeilen hinzufÃ¼gen. FÃ¼gen Sie dynamische Felder wie das aktuelle Datum, den Dateinamen oder Seitenzahlen ein.</p>
    `,
    howToUse: [
      { step: 1, title: 'PDF hochladen', description: 'WÃ¤hlen Sie Ihr Dokument aus.' },
      { step: 2, title: 'Inhalt definieren', description: 'Geben Sie Text fÃ¼r die linke, mittlere oder rechte Position in Kopf/FuÃŸzeile ein.' },
      { step: 3, title: 'Layout anpassen', description: 'WÃ¤hlen Sie AbstÃ¤nde zum Rand und Schriftstile aus.' },
    ],
    useCases: [
      { title: 'GeschÃ¤ftskorrespondenz', description: 'FÃ¼gen Sie Firmennamen und Kontaktdaten zu jedem PDF hinzu.', icon: 'briefcase' },
      { title: 'Juristische SchriftsÃ¤tze', description: 'FÃ¼gen Sie Aktenzeichen und Seitenzahlen standardisiert ein.', icon: 'scale' },
      { title: 'Dokumentation', description: 'Kennzeichnen Sie Versionen und Daten in der Kopfzeile.', icon: 'file-text' },
    ],
    faq: [
      { question: 'Sind unterschiedliche Kopfzeilen mÃ¶glich?', answer: 'Ja, Sie kÃ¶nnen fÃ¼r gerade und ungerade Seiten verschiedene Inhalte festlegen.' },
      { question: 'Kann ich Variablen nutzen?', answer: 'Ja, Felder wie [Datum] oder [Dateiname] werden automatisch ausgefÃ¼llt.' },
      { question: 'Ãœberdeckt das den Inhalt?', answer: 'Sie kÃ¶nnen die RÃ¤nder des Dokuments anpassen, um Platz fÃ¼r die Zeilen zu schaffen.' },
    ],
  },

  // ==================== VISUALS & COLORS ====================
  'invert-colors': {
    title: 'Farben invertieren',
    metaDescription: 'PDF-Farben fÃ¼r den Dark Mode invertieren. Dokumente in Negativ-Farben umwandeln.',
    description: `
      <p>Invertieren Sie die Farben Ihrer PDF-Dokumente, um einen Negativ-Effekt zu erzielen. Dies ist besonders nÃ¼tzlich fÃ¼r das Lesen in dunkler Umgebung (Dark Mode), um die Augen zu schonen.</p>
    `,
    howToUse: [
      { step: 1, title: 'PDF hochladen', description: 'Laden Sie das PDF hoch, das Sie farblich umkehren mÃ¶chten.' },
      { step: 2, title: 'Optionen wÃ¤hlen', description: 'Entscheiden Sie, ob auch Bilder invertiert werden sollen oder nur Text/Hintergrund.' },
      { step: 3, title: 'Invertieren', description: 'Laden Sie die augenschonende Version Ihres PDFs herunter.' },
    ],
    useCases: [
      { title: 'Nachtmodus', description: 'Angenehmeres Lesen von hellen Dokumenten bei Nacht.', icon: 'moon' },
      { title: 'Barrierefreiheit', description: 'Hilfe fÃ¼r Nutzer mit SehschwÃ¤che durch hÃ¶heren Kontrast.', icon: 'eye' },
      { title: 'Tinte sparen', description: 'Invertieren Sie dunkle Dokumente mit viel schwarzem Hintergrund vor dem Drucken.', icon: 'printer' },
    ],
    faq: [
      { question: 'Sieht das Dokument dann aus wie ein Negativ-Foto?', answer: 'Ja, weiÃŸer Hintergrund wird schwarz und schwarzer Text wird weiÃŸ.' },
      { question: 'Bleiben Bilder normal?', answer: 'Sie kÃ¶nnen wÃ¤hlen, ob Bilder von der Invertierung ausgeschlossen werden sollen.' },
      { question: 'Ist das umkehrbar?', answer: 'Ja, Sie kÃ¶nnen das resultierende PDF einfach erneut invertieren, um die Originalfarben fast exakt wiederherzustellen.' },
    ],
  },// ==================== VISUALS & COLORS (Fortsetzung) ====================
  'background-color': {
    title: 'Hintergrundfarbe Ã¤ndern',
    metaDescription: 'PDF-Hintergrundfarbe Ã¤ndern. FÃ¼gen Sie farbige HintergrÃ¼nde zu Ihren Dokumentseiten hinzu.',
    description: `
      <p>Mit diesem Tool kÃ¶nnen Sie die Hintergrundfarbe Ihrer PDF-Seiten Ã¤ndern oder eine neue hinzufÃ¼gen. Dies kann die Lesbarkeit verbessern, das Dokument optisch aufwerten oder es an Ihr Branding anpassen.</p>
      <p>WÃ¤hlen Sie eine beliebige Farbe aus und wenden Sie diese auf das gesamte Dokument oder nur auf bestimmte Seiten an. Alle vorhandenen Inhalte bleiben dabei im Vordergrund erhalten.</p>
    `,
    howToUse: [
      { step: 1, title: 'PDF hochladen', description: 'WÃ¤hlen Sie das Dokument aus, dessen Hintergrund Sie einfÃ¤rben mÃ¶chten.' },
      { step: 2, title: 'Farbe wÃ¤hlen', description: 'Nutzen Sie den FarbwÃ¤hler oder geben Sie einen Hex-Code ein.' },
      { step: 3, title: 'Anwenden', description: 'Speichern Sie das PDF mit dem neuen Hintergrund-Layer.' },
    ],
    useCases: [
      { title: 'Lesbarkeit verbessern', description: 'Nutzen Sie ein sanftes Beige oder Sepia, um die Augen bei langem Lesen zu entlasten.', icon: 'eye' },
      { title: 'Markendesign', description: 'Passen Sie PrÃ¤sentationsunterlagen an Ihre Firmenfarben an.', icon: 'palette' },
      { title: 'Bereiche markieren', description: 'Verwenden Sie unterschiedliche Farben, um Kapitel optisch zu trennen.', icon: 'layers' },
    ],
    faq: [
      { question: 'Wird der Text Ã¼berdeckt?', answer: 'Nein, die Farbe wird als unterste Ebene hinzugefÃ¼gt, sodass Text und Bilder sichtbar bleiben.' },
      { question: 'Kann ich verschiedene Farben pro Seite nutzen?', answer: 'Ja, Sie kÃ¶nnen das Tool fÃ¼r einzelne Seiten oder Bereiche separat anwenden.' },
      { question: 'Kann ich vorhandene Farben entfernen?', answer: 'Dieses Tool fÃ¼gt Farben hinzu. Zum Entfernen komplexer HintergrÃ¼nde nutzen Sie bitte den PDF-Editor.' },
    ],
  },

  'text-color': {
    title: 'Textfarbe Ã¤ndern',
    metaDescription: 'Ã„ndern Sie die Textfarbe in PDF-Dokumenten. Modifizieren Sie die Farbe aller Textinhalte zentral.',
    description: `
      <p>Passen Sie die Farbe aller Textelemente in Ihrem PDF an. Dies ist ideal, um den Kontrast zu erhÃ¶hen, ein Dokument fÃ¼r den Druck vorzubereiten oder die Optik an Corporate-Design-Vorgaben anzupassen.</p>
    `,
    howToUse: [
      { step: 1, title: 'PDF hochladen', description: 'Laden Sie das PDF-Dokument hoch.' },
      { step: 2, title: 'Farbe festlegen', description: 'WÃ¤hlen Sie die neue Farbe fÃ¼r alle enthaltenen Texte aus.' },
      { step: 3, title: 'Konvertieren', description: 'Das Tool fÃ¤rbt alle Schriften um und stellt das PDF zum Download bereit.' },
    ],
    useCases: [
      { title: 'Kontrast optimieren', description: 'Ã„ndern Sie hellen Text in Schwarz, um die Lesbarkeit zu garantieren.', icon: 'contrast' },
      { title: 'Einheitliches Branding', description: 'FÃ¤rben Sie Texte in Ihre spezifische Markenfarbe um.', icon: 'palette' },
      { title: 'Barrierefreiheit', description: 'Passen Sie Farben an, um Web-Standards fÃ¼r Kontraste zu erfÃ¼llen.', icon: 'accessibility' },
    ],
    faq: [
      { question: 'Wird wirklich jeder Text geÃ¤ndert?', answer: 'Ja, das Tool erkennt Textelemente und wendet die neue Farbe global an.' },
      { question: 'Bleiben Fettdruck und Kursivschrift erhalten?', answer: 'Ja, alle Formatierungen bleiben bestehen, nur der Farbwert wird geÃ¤ndert.' },
      { question: 'Gilt das auch fÃ¼r Bilder?', answer: 'Nein, Text in Bildern (Rastergrafiken) kann auf diese Weise nicht umgefÃ¤rbt werden.' },
    ],
  },

  'add-stamps': {
    title: 'Stempel hinzufÃ¼gen',
    metaDescription: 'Stempel zu PDF-Dokumenten hinzufÃ¼gen. Nutzen Sie Vorlagen fÃ¼r Genehmigungen, EntwÃ¼rfe und mehr.',
    description: `
      <p>Versehen Sie Ihre PDFs mit digitalen Stempeln. Nutzen Sie klassische BÃ¼rostempel wie "GENEHMIGT", "ABGELEHNT" oder "ENTWURF", oder laden Sie Ihr eigenes Stempelbild hoch.</p>
    `,
    howToUse: [
      { step: 1, title: 'PDF hochladen', description: 'WÃ¤hlen Sie das zu stempelnde Dokument.' },
      { step: 2, title: 'Stempel wÃ¤hlen', description: 'WÃ¤hlen Sie eine Vorlage oder laden Sie ein eigenes PNG/JPG hoch.' },
      { step: 3, title: 'Platzieren', description: 'Klicken Sie auf die gewÃ¼nschte Stelle, passen Sie die GrÃ¶ÃŸe an und speichern Sie.' },
    ],
    useCases: [
      { title: 'Freigabeprozesse', description: 'Markieren Sie Rechnungen oder VertrÃ¤ge als "GeprÃ¼ft" oder "Bezahlt".', icon: 'check-circle' },
      { title: 'Status-Updates', description: 'Kennzeichnen Sie Dokumente als "Final" oder "Veraltet".', icon: 'tag' },
      { title: 'QualitÃ¤tskontrolle', description: 'FÃ¼gen Sie PrÃ¼fsiegel oder Inspektionsstempel hinzu.', icon: 'clipboard-check' },
    ],
    faq: [
      { question: 'Welche Vorlagen gibt es?', answer: 'Genehmigt, Abgelehnt, Entwurf, Vertraulich, Kopie und viele mehr.' },
      { question: 'Kann ich eigene Logos nutzen?', answer: 'Ja, Sie kÃ¶nnen jedes Bild als individuellen Stempel hochladen.' },
      { question: 'Kann ich mehrere Stempel nutzen?', answer: 'Ja, Sie kÃ¶nnen so viele Stempel wie nÃ¶tig auf verschiedenen Seiten platzieren.' },
    ],
  },

  'remove-annotations': {
    title: 'Anmerkungen entfernen',
    metaDescription: 'Anmerkungen aus PDF-Dateien lÃ¶schen. Bereinigen Sie Kommentare, Highlights und Markups.',
    description: `
      <p>Entfernen Sie alle Kommentare, Markierungen und Notizen aus Ihrem PDF. So erstellen Sie eine saubere Version des Dokuments fÃ¼r die finale VerÃ¶ffentlichung oder Weitergabe.</p>
    `,
    howToUse: [
      { step: 1, title: 'PDF hochladen', description: 'Laden Sie das kommentierte Dokument hoch.' },
      { step: 2, title: 'Typen wÃ¤hlen', description: 'WÃ¤hlen Sie aus, ob nur Kommentare, Highlights oder alle Markups gelÃ¶scht werden sollen.' },
      { step: 3, title: 'Bereinigen', description: 'Laden Sie das "saubere" PDF ohne Korrekturspuren herunter.' },
    ],
    useCases: [
      { title: 'Finalisierung', description: 'Entfernen Sie interne Korrekturhinweise vor dem Versand an Kunden.', icon: 'file-check' },
      { title: 'Datenschutz', description: 'LÃ¶schen Sie potenziell sensible Kommentare aus dem Review-Prozess.', icon: 'shield' },
      { title: 'Saubere Kopie', description: 'Erstellen Sie eine Druckversion ohne stÃ¶rende Hervorhebungen.', icon: 'copy' },
    ],
    faq: [
      { question: 'Welche Elemente werden gelÃ¶scht?', answer: 'Highlights, Unterstreichungen, Haftnotizen, Stempel und Freihandzeichnungen.' },
      { question: 'Bleibt der Text erhalten?', answer: 'Ja, nur die darÃ¼berliegenden Anmerkungen werden entfernt; der eigentliche Inhalt bleibt unberÃ¼hrt.' },
      { question: 'Ist das rÃ¼ckgÃ¤ngig zu machen?', answer: 'Nach dem Download nicht mehr. Behalten Sie fÃ¼r den Fall der FÃ¤lle Ihr Original.' },
    ],
  },

  // ==================== FORM TOOLS ====================
  'form-filler': {
    title: 'Formular-AusfÃ¼ller',
    metaDescription: 'PDF-Formulare online ausfÃ¼llen. Bearbeiten Sie interaktive Formulare direkt im Browser.',
    description: `
      <p>FÃ¼llen Sie interaktive PDF-Formulare direkt im Browser aus. Geben Sie Text ein, setzen Sie HÃ¤kchen in Checkboxen und wÃ¤hlen Sie Optionen aus Dropdown-MenÃ¼s â€“ ganz ohne Drucken.</p>
    `,
    howToUse: [
      { step: 1, title: 'Formular hochladen', description: 'WÃ¤hlen Sie die PDF-Formulardatei aus.' },
      { step: 2, title: 'AusfÃ¼llen', description: 'Klicken Sie in die Felder und geben Sie Ihre Daten ein.' },
      { step: 3, title: 'Speichern', description: 'Laden Sie das fertig ausgefÃ¼llte Formular herunter.' },
    ],
    useCases: [
      { title: 'AntrÃ¤ge & BehÃ¶rden', description: 'FÃ¼llen Sie Anmeldeformulare oder AntrÃ¤ge digital aus.', icon: 'clipboard' },
      { title: 'Steuerformulare', description: 'Bearbeiten Sie Finanzdokumente bequem am Rechner.', icon: 'file-text' },
      { title: 'Vertragsdaten', description: 'ErgÃ¤nzen Sie Ihre persÃ¶nlichen Daten in VertragsentwÃ¼rfen.', icon: 'file-signature' },
    ],
    faq: [
      { question: 'Kann ich den Fortschritt speichern?', answer: 'Ja, Sie kÃ¶nnen das teilweise ausgefÃ¼llte Formular speichern und spÃ¤ter weiterbearbeiten.' },
      { question: 'Was ist "Flattening"?', answer: 'Dabei werden die Felder in statischen Text umgewandelt, damit sie nach dem Versand nicht mehr geÃ¤ndert werden kÃ¶nnen.' },
      { question: 'Werden XFA-Formulare unterstÃ¼tzt?', answer: 'Ja, das Tool unterstÃ¼tzt sowohl Standard-AcroForms als auch XFA-Formate.' },
    ],
  },

  'form-creator': {
    title: 'Formular-Ersteller',
    metaDescription: 'Erstellen Sie ausfÃ¼llbare PDF-Formulare. FÃ¼gen Sie Textfelder, Checkboxen und Dropdowns hinzu.',
    description: `
      <p>Verwandeln Sie statische PDFs in interaktive Formulare. FÃ¼gen Sie Textfelder, Checkboxen, Radio-Buttons und Dropdowns hinzu, um professionelle Datenerfassung zu ermÃ¶glichen.</p>
    `,
    howToUse: [
      { step: 1, title: 'PDF hochladen', description: 'Laden Sie das Dokument hoch, das als Basis fÃ¼r Ihr Formular dient.' },
      { step: 2, title: 'Felder hinzufÃ¼gen', description: 'WÃ¤hlen Sie Feldtypen aus der Toolbar und platzieren Sie diese per Klick.' },
      { step: 3, title: 'Konfigurieren', description: 'Legen Sie Eigenschaften wie Pflichtfelder fest und speichern Sie das Ergebnis.' },
    ],
    useCases: [
      { title: 'BewerbungsbÃ¶gen', description: 'Erstellen Sie strukturierte Formulare fÃ¼r Job-Interessenten.', icon: 'user-plus' },
      { title: 'Umfragen', description: 'Bauen Sie interaktive FragebÃ¶gen zur Datenerhebung auf.', icon: 'clipboard-list' },
      { title: 'Bestellformulare', description: 'Erstellen Sie Dokumente mit Mengenfeldern und Auswahloptionen.', icon: 'shopping-cart' },
    ],
    faq: [
      { question: 'Welche Feldtypen gibt es?', answer: 'Textzeilen, Checkboxen, AuswahlknÃ¶pfe, Listen, Datumsfelder und Signaturfelder.' },
      { question: 'Sind Berechnungen mÃ¶glich?', answer: 'Ja, einfache Summen- oder Durchschnittsberechnungen kÃ¶nnen fÃ¼r Zahlenfelder konfiguriert werden.' },
      { question: 'KÃ¶nnen Felder Pflichtfelder sein?', answer: 'Ja, Sie kÃ¶nnen festlegen, dass bestimmte Felder ausgefÃ¼llt werden mÃ¼ssen.' },
    ],
  },

  'remove-blank-pages': {
    title: 'Leerseiten entfernen',
    metaDescription: 'Erkennen und lÃ¶schen Sie automatisch leere Seiten aus Ihren PDF-Dokumenten.',
    description: `
      <p>Dieses intelligente Tool erkennt und entfernt automatisch leere Seiten aus Ihren Dokumenten. Ideal zum Bereinigen von Scans oder zum Entfernen von TrennblÃ¤ttern nach dem ZusammenfÃ¼gen.</p>
    `,
    howToUse: [
      { step: 1, title: 'PDF hochladen', description: 'WÃ¤hlen Sie das zu bereinigende Dokument.' },
      { step: 2, title: 'Empfindlichkeit wÃ¤hlen', description: 'Stellen Sie ein, ab wann eine Seite als "leer" gilt (z.B. trotz kleiner Scan-Punkte).' },
      { step: 3, title: 'Entfernen', description: 'Laden Sie das kompakte PDF ohne unnÃ¶tige Leerseiten herunter.' },
    ],
    useCases: [
      { title: 'Scan-Optimierung', description: 'Entfernen Sie RÃ¼ckseiten von Dokumenten, die nur einseitig bedruckt waren.', icon: 'scan' },
      { title: 'DateigrÃ¶ÃŸe reduzieren', description: 'Sparen Sie Platz, indem Sie nutzlose Seiten lÃ¶schen.', icon: 'minimize-2' },
      { title: 'Trennseiten lÃ¶schen', description: 'Entfernen Sie Platzhalterseiten aus zusammengefÃ¼gten Stapeln.', icon: 'minus' },
    ],
    faq: [
      { question: 'Wie funktioniert die Erkennung?', answer: 'Das Tool analysiert den Inhalt der Seite. Seiten mit fast keinem sichtbaren Inhalt werden als leer markiert.' },
      { question: 'Was ist mit Schmutzpartikeln auf dem Scan?', answer: 'Sie kÃ¶nnen den Schwellenwert anpassen, sodass auch Seiten mit minimalen "Rausch-Punkten" als leer erkannt werden.' },
      { question: 'Sehe ich vorher, was gelÃ¶scht wird?', answer: 'Ja, die erkannten Seiten werden in einer Vorschau markiert, bevor Sie das LÃ¶schen bestÃ¤tigen.' },
    ],
  },// ==================== CONVERT TO PDF ====================
  'image-to-pdf': {
    title: 'Bild in PDF',
    metaDescription: 'Konvertieren Sie beliebige Bilder in PDF. UnterstÃ¼tzung fÃ¼r JPG, PNG, WebP, BMP, TIFF, SVG und HEIC.',
    description: `
      <p>Wandeln Sie Bilder jeglicher Formate in professionelle PDF-Dokumente um. Mit UnterstÃ¼tzung fÃ¼r JPG, PNG, WebP, BMP, TIFF, SVG und HEIC ist dies Ihr universeller Bildkonverter.</p>
      <p>Kombinieren Sie mehrere Bilder zu einer einzigen PDF-Datei, ordnen Sie diese nach Belieben an und passen Sie SeitengrÃ¶ÃŸe sowie Ausrichtung individuell an.</p>
    `,
    howToUse: [
      { step: 1, title: 'Bilder hochladen', description: 'Ziehen Sie Bilder in den Upload-Bereich oder wÃ¤hlen Sie Dateien von Ihrem GerÃ¤t.' },
      { step: 2, title: 'Anordnen & Konfigurieren', description: 'Sortieren Sie die Bilder und legen Sie das Seitenformat (z. B. A4 oder OriginalgrÃ¶ÃŸe) fest.' },
      { step: 3, title: 'Konvertieren', description: 'Erstellen Sie Ihr PDF und laden Sie das Ergebnis sofort herunter.' },
    ],
    useCases: [
      { title: 'Fotosammlungen', description: 'Fassen Sie Urlaubsfotos oder Event-Bilder in einem Album-PDF zusammen.', icon: 'images' },
      { title: 'Dokumenten-Archiv', description: 'Digitalisieren Sie Papierunterlagen, indem Sie Bild-Scans in PDF archivieren.', icon: 'archive' },
      { title: 'Portfolios', description: 'Erstellen Sie eine professionelle Mappe aus Ihren Design-EntwÃ¼rfen.', icon: 'file-stack' },
    ],
    faq: [
      { question: 'Welche Formate werden unterstÃ¼tzt?', answer: 'JPG, PNG, WebP, BMP, TIFF, SVG und das Apple-Format HEIC.' },
      { question: 'Bleibt die BildqualitÃ¤t erhalten?', answer: 'Ja, Bilder werden standardmÃ¤ÃŸig in ihrer OriginalauflÃ¶sung eingebettet.' },
      { question: 'Kann ich die Reihenfolge Ã¤ndern?', answer: 'Ja, Sie kÃ¶nnen die Bilder per Drag & Drop sortieren, bevor Sie das PDF generieren.' },
    ],
  },

  'png-to-pdf': {
    title: 'PNG in PDF',
    metaDescription: 'Konvertieren Sie PNG-Bilder in PDF. Erhalten Sie Transparenzen und kombinieren Sie mehrere PNGs.',
    description: `
      <p>Konvertieren Sie PNG-Dateien in PDF, wÃ¤hrend Transparenzen erhalten bleiben. Ideal fÃ¼r Grafiken, Logos und Screenshots, die einen transparenten Hintergrund besitzen.</p>
    `,
    howToUse: [
      { step: 1, title: 'PNGs hochladen', description: 'WÃ¤hlen Sie Ihre PNG-Dateien aus.' },
      { step: 2, title: 'Layout wÃ¤hlen', description: 'Bestimmen Sie die SeitengrÃ¶ÃŸe und die Bildanordnung.' },
      { step: 3, title: 'Herunterladen', description: 'Laden Sie das fertige PDF-Dokument herunter.' },
    ],
    useCases: [
      { title: 'Grafik-Portfolios', description: 'PrÃ¤sentieren Sie Logos und UI-Designs in einem sauberen Dokument.', icon: 'palette' },
      { title: 'Software-Dokumentation', description: 'Fassen Sie Programm-Screenshots zu einer Anleitung zusammen.', icon: 'monitor' },
      { title: 'Logo-Kataloge', description: 'Erstellen Sie eine Ãœbersicht Ihrer Marken-Assets.', icon: 'award' },
    ],
    faq: [
      { question: 'Bleibt die Transparenz erhalten?', answer: 'Ja, transparente Bereiche im PNG werden im PDF korrekt dargestellt.' },
      { question: 'Was passiert mit animierten PNGs?', answer: 'Diese werden als statisches Bild (das erste Frame) konvertiert.' },
      { question: 'Kann ich die Hintergrundfarbe wÃ¤hlen?', answer: 'Ja, Sie kÃ¶nnen fÃ¼r transparente Bereiche eine Hintergrundfarbe im PDF festlegen.' },
    ],
  },

  'webp-to-pdf': {
    title: 'WebP in PDF',
    metaDescription: 'WebP-Bilder in PDF konvertieren. Modernes Bildformat einfach fÃ¼r Druck und Archivierung umwandeln.',
    description: `
      <p>Wandeln Sie moderne WebP-Bilder in das universell kompatible PDF-Format um. Ideal, um Bilder direkt aus dem Web fÃ¼r den Druck oder die Langzeitarchivierung vorzubereiten.</p>
    `,
    howToUse: [
      { step: 1, title: 'WebP hochladen', description: 'WÃ¤hlen Sie WebP-Dateien aus Ihrem Ordner aus.' },
      { step: 2, title: 'Optionen anpassen', description: 'WÃ¤hlen Sie Hoch- oder Querformat fÃ¼r Ihre PDF-Seiten.' },
      { step: 3, title: 'Speichern', description: 'Generieren Sie das PDF aus Ihren WebP-Grafiken.' },
    ],
    useCases: [
      { title: 'Web-Inhalte archivieren', description: 'Speichern Sie Bilder von Webseiten dauerhaft im PDF-Format.', icon: 'globe' },
      { title: 'Druckvorbereitung', description: 'Machen Sie moderne Web-Bilder fÃ¼r Standarddrucker verfÃ¼gbar.', icon: 'printer' },
      { title: 'Format-Standardisierung', description: 'Konvertieren Sie WebP in das plattformÃ¼bergreifende PDF-Format.', icon: 'file-check' },
    ],
    faq: [
      { question: 'Was ist WebP?', answer: 'Ein von Google entwickeltes Format fÃ¼r hohe Kompression im Web.' },
      { question: 'Ist die Konvertierung verlustfrei?', answer: 'Ja, die BildqualitÃ¤t des WebP-Originals bleibt im PDF erhalten.' },
      { question: 'Funktioniert es mit animierten WebPs?', answer: 'Diese werden als Standbilder konvertiert.' },
    ],
  },

  'svg-to-pdf': {
    title: 'SVG in PDF',
    metaDescription: 'SVG-Vektorgrafiken in PDF konvertieren. Erhalten Sie Skalierbarkeit und verlustfreie QualitÃ¤t.',
    description: `
      <p>Wandeln Sie skalierbare Vektorgrafiken (SVG) in PDF um, ohne an SchÃ¤rfe zu verlieren. Da PDF ebenfalls Vektoren unterstÃ¼tzt, bleibt Ihr Design bei jeder VergrÃ¶ÃŸerung gestochen scharf.</p>
    `,
    howToUse: [
      { step: 1, title: 'SVG hochladen', description: 'WÃ¤hlen Sie Ihre SVG-Vektordateien aus.' },
      { step: 2, title: 'Seiteneinstellungen', description: 'WÃ¤hlen Sie ein passendes Format fÃ¼r Ihre Grafiken.' },
      { step: 3, title: 'Konvertieren', description: 'Laden Sie das Vektor-PDF herunter.' },
    ],
    useCases: [
      { title: 'Logo-Druck', description: 'Bereiten Sie Vektor-Logos fÃ¼r den professionellen Druck vor.', icon: 'award' },
      { title: 'Technische PlÃ¤ne', description: 'Wandeln Sie CAD-Exporte oder Diagramme in PDF um.', icon: 'ruler' },
      { title: 'Illustrationen', description: 'Erstellen Sie hochauflÃ¶sende Dokumente aus Vektor-Kunstwerken.', icon: 'grid' },
    ],
    faq: [
      { question: 'Bleibt die VektorqualitÃ¤t erhalten?', answer: 'Ja, das PDF behÃ¤lt die mathematischen Pfade bei, sodass der Inhalt unendlich skalierbar bleibt.' },
      { question: 'Werden Schriften korrekt eingebettet?', answer: 'In der Regel ja. FÃ¼r beste Ergebnisse sollten Schriften im SVG in Pfade umgewandelt sein.' },
      { question: 'UnterstÃ¼tzt das Tool komplexe Filter?', answer: 'Die meisten Standard-SVG-Filter und Gradienten werden unterstÃ¼tzt.' },
    ],
  },

  'heic-to-pdf': {
    title: 'HEIC in PDF',
    metaDescription: 'iPhone HEIC-Fotos in PDF konvertieren. Apple-Bildformate einfach fÃ¼r Windows und Android nutzbar machen.',
    description: `
      <p>Konvertieren Sie HEIC-Fotos von Ihrem iPhone oder iPad direkt in PDF. HEIC bietet zwar eine gute Kompression, ist aber nicht Ã¼berall lesbar â€“ PDF hingegen schon.</p>
    `,
    howToUse: [
      { step: 1, title: 'HEIC hochladen', description: 'WÃ¤hlen Sie Ihre Apple-Fotos aus.' },
      { step: 2, title: 'Sortieren', description: 'Bringen Sie Ihre Fotos in die gewÃ¼nschte Reihenfolge.' },
      { step: 3, title: 'Download', description: 'Laden Sie das universelle PDF-Dokument herunter.' },
    ],
    useCases: [
      { title: 'Mobile Fotoalben', description: 'Erstellen Sie PDFs aus Ihren Handyfotos zum Teilen mit Nicht-Apple-Nutzern.', icon: 'smartphone' },
      { title: 'Scans vom iPhone', description: 'Wandeln Sie mit der Kamera aufgenommene Dokumente in saubere PDFs um.', icon: 'scan' },
      { title: 'KompatibilitÃ¤t', description: 'Machen Sie HEIC-Bilder fÃ¼r Windows-PCs und Android-GerÃ¤te nutzbar.', icon: 'share-2' },
    ],
    faq: [
      { question: 'Was ist HEIC?', answer: 'Das Standard-Bildformat von Apple fÃ¼r effiziente Speicherung.' },
      { question: 'Werden Live-Photos unterstÃ¼tzt?', answer: 'Das Tool konvertiert das Hauptbild des Live-Photos in das PDF.' },
      { question: 'Bleiben Metadaten (Exif) erhalten?', answer: 'Sie kÃ¶nnen wÃ¤hlen, ob Aufnahmeort und Datum im Dokument verbleiben sollen.' },
    ],
  },

  'txt-to-pdf': {
    title: 'Text in PDF',
    metaDescription: 'Konvertieren Sie Textdateien (TXT) in formatiertes PDF. Passen Sie Schriftart und Layout an.',
    description: `
      <p>Wandeln Sie einfache Textdateien (.txt) in formatierte PDF-Dokumente um. Passen Sie Schriftarten, RÃ¤nder und das Seitenlayout an, um aus simplen Notizen professionelle Dokumente zu machen.</p>
    `,
    howToUse: [
      { step: 1, title: 'Textdatei hochladen', description: 'WÃ¤hlen Sie Ihre .txt-Datei aus.' },
      { step: 2, title: 'Formatierung', description: 'WÃ¤hlen Sie Schriftart (z. B. Monospace fÃ¼r Code) und SeitenrÃ¤nder.' },
      { step: 3, title: 'Speichern', description: 'Laden Sie das formatierte PDF-Dokument herunter.' },
    ],
    useCases: [
      { title: 'Code-Dokumentation', description: 'Wandeln Sie Programmiercode in lesbare PDF-Dateien um.', icon: 'code' },
      { title: 'Logfile-Archivierung', description: 'Speichern Sie Server-Logs in einem festen Dokumentenformat.', icon: 'file-text' },
      { title: 'Manuskripte', description: 'Machen Sie aus einfachen TextentwÃ¼rfen druckfertige PDFs.', icon: 'sticky-note' },
    ],
    faq: [
      { question: 'Werden Sonderzeichen unterstÃ¼tzt?', answer: 'Ja, das Tool unterstÃ¼tzt UTF-8 Kodierung fÃ¼r internationale Schriftzeichen.' },
      { question: 'Gibt es einen automatischen Zeilenumbruch?', answer: 'Ja, zu lange Zeilen werden automatisch an die Seitenbreite angepasst.' },
      { question: 'Kann ich die SchriftgrÃ¶ÃŸe Ã¤ndern?', answer: 'Ja, Sie kÃ¶nnen die GrÃ¶ÃŸe fÃ¼r optimale Lesbarkeit einstellen.' },
    ],
  },

  'json-to-pdf': {
    title: 'JSON in PDF',
    metaDescription: 'Konvertieren Sie JSON-Dateien in formatiertes PDF. Mit Syntax-Highlighting und strukturierter Ausgabe.',
    description: `
      <p>Verwandeln Sie JSON-Daten in ein lesbares, schÃ¶n formatiertes PDF. Das Tool bietet automatisches Syntax-Highlighting und EinrÃ¼ckungen, um komplexe Datenstrukturen visuell aufzubereiten.</p>
    `,
    howToUse: [
      { step: 1, title: 'JSON hochladen', description: 'WÃ¤hlen Sie Ihre .json-Datei aus.' },
      { step: 2, title: 'Stil wÃ¤hlen', description: 'Konfigurieren Sie das Farbschema fÃ¼r das Syntax-Highlighting.' },
      { step: 3, title: 'Generieren', description: 'Laden Sie das strukturierte Daten-PDF herunter.' },
    ],
    useCases: [
      { title: 'API-Dokumentation', description: 'PrÃ¤sentieren Sie Beispiel-Responses in einem sauberen Dokument.', icon: 'code' },
      { title: 'Konfigurations-Backups', description: 'Archivieren Sie Einstellungen in einem menschenlesbaren Format.', icon: 'settings' },
      { title: 'Daten-Berichte', description: 'Erstellen Sie Berichte aus JSON-Datenexporten.', icon: 'bar-chart' },
    ],
    faq: [
      { question: 'Ist der Code farbig markiert?', answer: 'Ja, SchlÃ¼ssel, Werte und Datentypen werden zur besseren Ãœbersicht farblich hervorgehoben.' },
      { question: 'Wie werden groÃŸe Dateien gehandhabt?', answer: 'Lange JSON-Strukturen werden automatisch auf mehrere Seiten verteilt.' },
      { question: 'Brauche ich Programmierkenntnisse?', answer: 'Nein, laden Sie einfach die Datei hoch und das Tool Ã¼bernimmt das Layout.' },
    ],
  },// ==================== CONVERT FROM PDF ====================
  'pdf-to-jpg': {
    title: 'PDF in JPG',
    metaDescription: 'Konvertieren Sie PDF-Seiten in JPG-Bilder. Hochwertige Extraktion mit einstellbarer AuflÃ¶sung.',
    description: `
      <p>Wandeln Sie Ihre PDF-Seiten in hochwertige JPG-Bilder um. Sie kÃ¶nnen entweder alle Seiten konvertieren oder gezielt einzelne Seiten auswÃ¤hlen. Dabei lassen sich AuflÃ¶sung (DPI) und BildqualitÃ¤t individuell anpassen.</p>
      <p>Ideal zum Erstellen von Vorschaubildern, zum Teilen von Dokumenten in sozialen Netzwerken oder zur Verwendung in Bildbearbeitungsprogrammen.</p>
    `,
    howToUse: [
      { step: 1, title: 'PDF hochladen', description: 'WÃ¤hlen Sie die PDF-Datei aus, die Sie umwandeln mÃ¶chten.' },
      { step: 2, title: 'QualitÃ¤t wÃ¤hlen', description: 'Stellen Sie die gewÃ¼nschte AuflÃ¶sung (DPI) und den Kompressionsgrad ein.' },
      { step: 3, title: 'Konvertieren', description: 'Laden Sie die Bilder einzeln oder gesammelt als ZIP-Archiv herunter.' },
    ],
    useCases: [
      { title: 'Web-VerÃ¶ffentlichung', description: 'Erstellen Sie Bildversionen von PDF-Seiten fÃ¼r Ihre Website.', icon: 'globe' },
      { title: 'Social Media', description: 'Teilen Sie Dokumentinhalte als einfache Bilder auf Instagram oder LinkedIn.', icon: 'share-2' },
      { title: 'PrÃ¤sentationen', description: 'FÃ¼gen Sie PDF-Folien als Bilder in PowerPoint oder Keynote ein.', icon: 'presentation' },
    ],
    faq: [
      { question: 'Welche AuflÃ¶sung wird unterstÃ¼tzt?', answer: 'Sie kÃ¶nnen zwischen 72 DPI (Web) und 300 DPI (DruckqualitÃ¤t) wÃ¤hlen.' },
      { question: 'Kann ich nur bestimmte Seiten wÃ¤hlen?', answer: 'Ja, Sie kÃ¶nnen einzelne Seiten oder Seitenbereiche fÃ¼r die Konvertierung festlegen.' },
      { question: 'Wie erhalte ich die Dateien?', answer: 'Bei mehreren Seiten erstellt das Tool automatisch einen praktischen ZIP-Ordner.' },
    ],
  },

  'pdf-to-png': {
    title: 'PDF in PNG',
    metaDescription: 'Konvertieren Sie PDF-Seiten in PNG-Bilder. Verlustfreie QualitÃ¤t mit UnterstÃ¼tzung fÃ¼r Transparenz.',
    description: `
      <p>Konvertieren Sie PDF-Dokumente in das verlustfreie PNG-Format. Im Gegensatz zu JPG bietet PNG eine perfekte BildqualitÃ¤t ohne Artefakte und unterstÃ¼tzt transparente HintergrÃ¼nde.</p>
      <p>Besonders geeignet fÃ¼r PDFs, die Diagramme, Logos oder Texte enthalten, die gestochen scharf bleiben mÃ¼ssen.</p>
    `,
    howToUse: [
      { step: 1, title: 'PDF hochladen', description: 'Laden Sie Ihr Dokument hoch.' },
      { step: 2, title: 'Optionen konfigurieren', description: 'WÃ¤hlen Sie die Seiten und die gewÃ¼nschte Pixeldichte aus.' },
      { step: 3, title: 'PNGs speichern', description: 'Extrahieren Sie die Seiten als hochwertige PNG-Dateien.' },
    ],
    useCases: [
      { title: 'Grafik-Extraktion', description: 'Speichern Sie Vektorgrafiken aus PDFs als saubere Rasterbilder.', icon: 'image' },
      { title: 'Design-Assets', description: 'Wandeln Sie PDF-EntwÃ¼rfe in PNGs fÃ¼r Grafiksoftware um.', icon: 'palette' },
      { title: 'Technische Doku', description: 'Erstellen Sie scharfe Abbildungen fÃ¼r HandbÃ¼cher und Anleitungen.', icon: 'file-text' },
    ],
    faq: [
      { question: 'Warum PNG statt JPG?', answer: 'PNG ist verlustfrei und eignet sich besser fÃ¼r Texte und Grafiken mit harten Kanten.' },
      { question: 'Bleibt die Transparenz erhalten?', answer: 'Ja, sofern das PDF transparente Ebenen hat, werden diese im PNG Ã¼bernommen.' },
      { question: 'Welchen DPI-Wert soll ich nutzen?', answer: '150 DPI fÃ¼r den Bildschirm, 300 DPI fÃ¼r eine sehr hohe DetailschÃ¤rfe.' },
    ],
  },

  'pdf-to-webp': {
    title: 'PDF in WebP',
    metaDescription: 'Konvertieren Sie PDF-Seiten in WebP-Bilder. Modernes Format mit exzellenter Kompression fÃ¼r das Web.',
    description: `
      <p>Wandeln Sie PDF-Seiten in das moderne WebP-Format von Google um. WebP bietet eine deutlich bessere Kompression als JPG oder PNG bei vergleichbarer QualitÃ¤t.</p>
      <p>Dies ist die beste Wahl, wenn Sie PDF-Inhalte schnell ladend auf einer modernen Website anzeigen mÃ¶chten.</p>
    `,
    howToUse: [
      { step: 1, title: 'PDF hochladen', description: 'WÃ¤hlen Sie das PDF-Dokument aus.' },
      { step: 2, title: 'Kompression wÃ¤hlen', description: 'Stellen Sie die Balance zwischen DateigrÃ¶ÃŸe und QualitÃ¤t ein.' },
      { step: 3, title: 'Download', description: 'Laden Sie die web-optimierten WebP-Bilder herunter.' },
    ],
    useCases: [
      { title: 'Web-Optimierung', description: 'Reduzieren Sie die Ladezeiten Ihrer Website durch WebP-Bilder.', icon: 'globe' },
      { title: 'Bandbreite sparen', description: 'Ideal fÃ¼r mobile Anwendungen mit begrenztem Datenvolumen.', icon: 'zap' },
      { title: 'Modernes Web-Design', description: 'Nutzen Sie zukunftssichere Bildformate fÃ¼r Ihre Projekte.', icon: 'layout' },
    ],
    faq: [
      { question: 'Ist WebP mit allen Browsern kompatibel?', answer: 'Ja, alle modernen Browser wie Chrome, Firefox, Edge und Safari unterstÃ¼tzen WebP.' },
      { question: 'Wie viel kleiner sind die Dateien?', answer: 'WebP-Dateien sind oft 25-35 % kleiner als vergleichbare JPG-Dateien.' },
      { question: 'Gibt es QualitÃ¤tsverluste?', answer: 'WebP bietet sowohl verlustbehaftete als auch verlustfreie Kompression an.' },
    ],
  },

  'pdf-to-bmp': {
    title: 'PDF in BMP',
    metaDescription: 'PDF-Seiten in BMP-Bitmap-Bilder konvertieren. Unkomprimiertes Format fÃ¼r maximale KompatibilitÃ¤t.',
    description: `
      <p>Wandeln Sie PDF-Seiten in das klassische BMP-Format (Windows Bitmap) um. BMP ist ein unkomprimiertes Format, das eine universelle KompatibilitÃ¤t mit Ã¤lteren Systemen und speziellen Windows-Anwendungen garantiert.</p>
    `,
    howToUse: [
      { step: 1, title: 'PDF hochladen', description: 'WÃ¤hlen Sie Ihre Datei aus.' },
      { step: 2, title: 'Seiten wÃ¤hlen', description: 'Bestimmen Sie, welche Seiten als Bitmap gespeichert werden sollen.' },
      { step: 3, title: 'BMP erstellen', description: 'Konvertieren und laden Sie die Bitmap-Bilder herunter.' },
    ],
    useCases: [
      { title: 'Altsysteme', description: 'Erstellen Sie Bilder fÃ¼r Software, die keine modernen Formate unterstÃ¼tzt.', icon: 'history' },
      { title: 'Windows-Anwendungen', description: 'Generieren Sie kompatible Dateien fÃ¼r spezifische Windows-Tools.', icon: 'monitor' },
      { title: 'Verlustfreie Archivierung', description: 'Speichern Sie Bilder vÃ¶llig ohne Kompressionsartefakte.', icon: 'archive' },
    ],
    faq: [
      { question: 'Warum sollte ich heute noch BMP nutzen?', answer: 'HauptsÃ¤chlich fÃ¼r die KompatibilitÃ¤t mit Legacy-Software oder industriellen Anwendungen.' },
      { question: 'Sind BMP-Dateien sehr groÃŸ?', answer: 'Ja, da sie nicht komprimiert sind, sind sie deutlich grÃ¶ÃŸer als JPG oder PNG.' },
      { question: 'Welche Farbtiefe wird unterstÃ¼tzt?', answer: 'Das Tool unterstÃ¼tzt Standard-Bitmaps mit 24-Bit und 32-Bit.' },
    ],
  },

  'pdf-to-tiff': {
    title: 'PDF in TIFF',
    metaDescription: 'PDF in TIFF-Bilder konvertieren. Professionelle QualitÃ¤t mit UnterstÃ¼tzung fÃ¼r mehrseitige TIFF-Dateien.',
    description: `
      <p>Konvertieren Sie PDFs in das hochwertige TIFF-Format. TIFF ist der Standard im professionellen Druck und in der Langzeitarchivierung, da es eine extrem hohe Farbtiefe und verlustfreie Kompression (LZW/ZIP) unterstÃ¼tzt.</p>
    `,
    howToUse: [
      { step: 1, title: 'PDF hochladen', description: 'Laden Sie das Dokument hoch.' },
      { step: 2, title: 'Format wÃ¤hlen', description: 'WÃ¤hlen Sie zwischen einzelnen TIFFs pro Seite oder einem einzelnen, mehrseitigen TIFF.' },
      { step: 3, title: 'Download', description: 'Laden Sie die professionellen Bilddateien herunter.' },
    ],
    useCases: [
      { title: 'Professioneller Druck', description: 'Erstellen Sie druckfÃ¤hige TIFF-Dateien fÃ¼r Verlage und Druckereien.', icon: 'printer' },
      { title: 'Dokumenten-Archivierung', description: 'Sichern Sie Dokumente in einem stabilen, hochwertigen Archivformat.', icon: 'archive' },
      { title: 'Publikationen', description: 'Wandeln Sie PDFs fÃ¼r die Weiterverarbeitung in Satzprogrammen um.', icon: 'book' },
    ],
    faq: [
      { question: 'UnterstÃ¼tzt das Tool mehrseitige TIFFs?', answer: 'Ja, Sie kÃ¶nnen das gesamte PDF in eine einzige, mehrseitige TIFF-Datei umwandeln.' },
      { question: 'Welche Kompression wird genutzt?', answer: 'Sie kÃ¶nnen zwischen LZW, ZIP oder vÃ¶llig unkomprimierter Ausgabe wÃ¤hlen.' },
      { question: 'Welcher DPI-Wert ist fÃ¼r den Druck nÃ¶tig?', answer: 'FÃ¼r professionelle Ergebnisse empfehlen wir mindestens 300 DPI.' },
    ],
  },

  'pdf-to-greyscale': {
    title: 'PDF in Graustufen',
    metaDescription: 'Farb-PDFs in Schwarz-WeiÃŸ (Graustufen) konvertieren. DateigrÃ¶ÃŸe reduzieren und Druckkosten sparen.',
    description: `
      <p>Wandeln Sie ein farbiges PDF in eine Graustufen-Version (Schwarz-WeiÃŸ) um. Dies ist ideal, um die DateigrÃ¶ÃŸe zu reduzieren und Dokumente optimal fÃ¼r den Schwarz-WeiÃŸ-Druck vorzubereiten.</p>
      <p>Texte bleiben gestochen scharf und Bilder behalten ihre Details, wÃ¤hrend alle Farbinformationen entfernt werden.</p>
    `,
    howToUse: [
      { step: 1, title: 'PDF hochladen', description: 'WÃ¤hlen Sie das farbige Dokument aus.' },
      { step: 2, title: 'Vorschau prÃ¼fen', description: 'Sehen Sie sich an, wie die Graustufen-Konvertierung wirkt.' },
      { step: 3, title: 'Download', description: 'Laden Sie das optimierte Schwarz-WeiÃŸ-PDF herunter.' },
    ],
    useCases: [
      { title: 'Druckkosten sparen', description: 'Vermeiden Sie teuren Farbdruck bei EntwÃ¼rfen oder Skripten.', icon: 'printer' },
      { title: 'DateigrÃ¶ÃŸe verringern', description: 'Reduzieren Sie die DateigrÃ¶ÃŸe durch das Entfernen von FarbkanÃ¤len.', icon: 'minimize-2' },
      { title: 'Professionelle Ã„sthetik', description: 'Geben Sie Dokumenten einen klassischen Schwarz-WeiÃŸ-Look.', icon: 'file-text' },
    ],
    faq: [
      { question: 'Bleibt der Text lesbar?', answer: 'Absolut. Das Tool optimiert die Kontraste, damit Texte weiterhin perfekt lesbar sind.' },
      { question: 'Wie viel Speicherplatz spare ich?', answer: 'Bei bildreichen Dokumenten kann die GrÃ¶ÃŸe oft um 20-50 % sinken.' },
      { question: 'Kann ich nur bestimmte Seiten entfÃ¤rben?', answer: 'Ja, Sie kÃ¶nnen gezielt auswÃ¤hlen, welche Seiten konvertiert werden sollen.' },
    ],
  },

  'pdf-to-json': {
    title: 'PDF in JSON',
    metaDescription: 'Extrahiert PDF-Inhalte in das JSON-Format. Erhalten Sie strukturierte Daten fÃ¼r Ihre Anwendungen.',
    description: `
      <p>Extrahieren Sie Text, Metadaten und die Struktur Ihres PDF-Dokuments in das maschinenlesbare JSON-Format. Dies ist das perfekte Tool fÃ¼r Entwickler und Datenanalysten.</p>
    `,
    howToUse: [
      { step: 1, title: 'PDF hochladen', description: 'WÃ¤hlen Sie die PDF-Quelldatei aus.' },
      { step: 2, title: 'Daten wÃ¤hlen', description: 'Bestimmen Sie, welche Informationen (Text, Layout, Metadaten) extrahiert werden sollen.' },
      { step: 3, title: 'JSON exportieren', description: 'Laden Sie die fertige JSON-Datei fÃ¼r Ihre Programmierung herunter.' },
    ],
    useCases: [
      { title: 'Datenanalyse', description: 'Werten Sie Textinhalte aus PDFs automatisiert aus.', icon: 'database' },
      { title: 'System-Integration', description: 'Importieren Sie PDF-Inhalte direkt in Ihre Datenbank oder App.', icon: 'plug' },
      { title: 'Metadaten-Audit', description: 'Analysieren Sie die technischen Details einer groÃŸen Anzahl von PDFs.', icon: 'search' },
    ],
    faq: [
      { question: 'Was genau wird im JSON gespeichert?', answer: 'Textinhalte, Positionsdaten, Schriftarten, Seitendimensionen und Metadaten.' },
      { question: 'Funktioniert das bei Scans?', answer: 'Nur wenn diese zuvor mit unserem OCR-Tool durchsuchbar gemacht wurden.' },
      { question: 'Ist das Format dokumentiert?', answer: 'Ja, wir nutzen ein standardisiertes Schema fÃ¼r eine einfache Weiterverarbeitung.' },
    ],
  },// ==================== ORGANIZE & MANAGE ====================
  'alternate-merge': {
    title: 'Wechselweise zusammenfÃ¼gen',
    metaDescription: 'PDFs durch abwechselnde Seiten zusammenfÃ¼gen. Kombinieren Sie Vorder- und RÃ¼ckseiten-Scans in einem Dokument.',
    description: `
      <p>Mit "Wechselweise zusammenfÃ¼gen" kombinieren Sie zwei PDF-Dateien, indem die Seiten abwechselnd (interleaved) hintereinandergelegt werden. Dies ist die perfekte LÃ¶sung, wenn Sie Vorder- und RÃ¼ckseiten separat gescannt haben.</p>
      <p>Laden Sie einfach die Datei mit den Vorderseiten und die Datei mit den RÃ¼ckseiten hoch. Das Tool fÃ¼gt diese automatisch zu einem logischen Gesamtdokument zusammen. Sie kÃ¶nnen die Reihenfolge einer Datei auch umkehren, falls diese rÃ¼ckwÃ¤rts gescannt wurde.</p>
    `,
    howToUse: [
      { step: 1, title: 'Zwei PDFs hochladen', description: 'WÃ¤hlen Sie die PDF mit den ungeraden Seiten (Vorderseiten) und die mit den geraden Seiten (RÃ¼ckseiten).' },
      { step: 2, title: 'Reihenfolge konfigurieren', description: 'WÃ¤hlen Sie bei Bedarf "Reihenfolge umkehren" fÃ¼r das zweite Dokument (oft bei Back-to-Front-Scans nÃ¶tig).' },
      { step: 3, title: 'ZusammenfÃ¼gen', description: 'Klicken Sie auf "Merge", um die Seiten zu verschachteln und das Ergebnis zu laden.' },
    ],
    useCases: [
      { title: 'Duplex-Scannen', description: 'Kombinieren Sie Scans von GerÃ¤ten, die nicht automatisch beidseitig scannen.', icon: 'copy' },
      { title: 'Dokumentenmontage', description: 'Verschachteln Sie Seiten aus zwei zusammengehÃ¶rigen Berichten.', icon: 'layers' },
      { title: 'Buch-Scans', description: 'FÃ¼gen Sie Scans von linken und rechten Buchseiten zu einem flÃ¼ssigen Dokument zusammen.', icon: 'book' },
    ],
    faq: [
      { question: 'Was passiert bei unterschiedlicher Seitenanzahl?', answer: 'ÃœberschÃ¼ssige Seiten des lÃ¤ngeren Dokuments werden einfach am Ende angehÃ¤ngt.' },
      { question: 'Kann ich die Seitenreihenfolge umkehren?', answer: 'Ja, das Tool bietet eine Option, um eine der Dateien vor dem Mischen umzukehren.' },
      { question: 'Ist das besser als normales ZusammenfÃ¼gen?', answer: 'Ja, beim normalen Mischen werden Dateien nur angehÃ¤ngt; hier werden sie wie ein Kartenspiel gemischt.' },
    ],
  },

  'add-attachments': {
    title: 'AnhÃ¤nge hinzufÃ¼gen',
    metaDescription: 'Dateien in PDF-Dokumente einbetten. FÃ¼gen Sie beliebige Dateitypen als Anhang zu Ihren PDFs hinzu.',
    description: `
      <p>Betten Sie beliebige Dateien direkt in Ihre PDF-Dokumente ein. Ob Tabellen, Bilder oder Quellcode â€“ erstellen Sie umfassende PDF-Pakete, in denen alle relevanten Daten enthalten sind.</p>
      <p>Die AnhÃ¤nge werden Teil der PDF-Datei und kÃ¶nnen vom EmpfÃ¤nger mit jedem gÃ¤ngigen PDF-Reader wieder extrahiert werden.</p>
    `,
    howToUse: [
      { step: 1, title: 'PDF hochladen', description: 'WÃ¤hlen Sie das Haupt-PDF-Dokument aus.' },
      { step: 2, title: 'Dateien hinzufÃ¼gen', description: 'WÃ¤hlen Sie die Dateien aus, die Sie im PDF einbetten mÃ¶chten.' },
      { step: 3, title: 'Speichern', description: 'Laden Sie das PDF mit den integrierten AnhÃ¤ngen herunter.' },
    ],
    useCases: [
      { title: 'Projektpakete', description: 'BÃ¼ndeln Sie Designdateien oder Kalkulationen direkt in der Dokumentation.', icon: 'package' },
      { title: 'Berichtsverteilung', description: 'FÃ¼gen Sie Rohdaten als Excel-Datei an einen PDF-Bericht an.', icon: 'paperclip' },
      { title: 'Vertragsunterlagen', description: 'HÃ¤ngen Sie unterstÃ¼tzende Dokumente direkt an den Hauptvertrag.', icon: 'file-text' },
    ],
    faq: [
      { question: 'Welche Dateitypen werden unterstÃ¼tzt?', answer: 'Sie kÃ¶nnen jeden beliebigen Dateityp in ein PDF einbetten.' },
      { question: 'Gibt es eine GrÃ¶ÃŸenbeschrÃ¤nkung?', answer: 'Die GesamtgrÃ¶ÃŸe des PDFs inkl. AnhÃ¤ngen sollte 500 MB nicht Ã¼berschreiten.' },
      { question: 'KÃ¶nnen EmpfÃ¤nger die Dateien sehen?', answer: 'Ja, moderne PDF-Reader zeigen AnhÃ¤nge in einer speziellen Seitenleiste an.' },
    ],
  },

  'extract-attachments': {
    title: 'AnhÃ¤nge extrahieren',
    metaDescription: 'Eingebettete Dateien aus PDFs extrahieren. Laden Sie alle AnhÃ¤nge aus einem PDF-Dokument herunter.',
    description: `
      <p>Holen Sie alle eingebetteten Dateien aus einem PDF-Dokument heraus. Sie kÃ¶nnen AnhÃ¤nge einzeln oder alle zusammen als praktisches ZIP-Archiv herunterladen.</p>
    `,
    howToUse: [
      { step: 1, title: 'PDF hochladen', description: 'WÃ¤hlen Sie das PDF aus, das AnhÃ¤nge enthÃ¤lt.' },
      { step: 2, title: 'AnhÃ¤nge anzeigen', description: 'Sehen Sie eine Liste aller im PDF versteckten Dateien.' },
      { step: 3, title: 'Herunterladen', description: 'Speichern Sie die Dateien einzeln oder als komplettes Paket.' },
    ],
    useCases: [
      { title: 'Quellcode abrufen', description: 'Extrahierten Sie Originaldaten aus wissenschaftlichen PDF-Berichten.', icon: 'download' },
      { title: 'Pakete entpacken', description: 'Greifen Sie auf Dokumente zu, die Ihnen als PDF-Portfolio geschickt wurden.', icon: 'folder-open' },
      { title: 'Batch-Extraktion', description: 'Holen Sie AnhÃ¤nge aus mehreren PDFs gleichzeitig heraus.', icon: 'layers' },
    ],
    faq: [
      { question: 'Was, wenn keine AnhÃ¤nge vorhanden sind?', answer: 'Das Tool zeigt Ihnen sofort an, ob das Dokument eingebettete Dateien enthÃ¤lt oder nicht.' },
      { question: 'Wird das PDF dabei beschÃ¤digt?', answer: 'Nein, die AnhÃ¤nge werden kopiert; das Original-PDF bleibt unverÃ¤ndert.' },
      { question: 'Werden alle Formate unterstÃ¼tzt?', answer: 'Ja, das Tool extrahiert jeden Dateityp, der im PDF gespeichert wurde.' },
    ],
  },

  'divide-pages': {
    title: 'Seiten unterteilen',
    metaDescription: 'PDF-Seiten in mehrere Abschnitte aufteilen. Unterteilen Sie Seiten horizontal oder vertikal.',
    description: `
      <p>Dieses Tool schneidet einzelne PDF-Seiten in mehrere Teile. Sie kÃ¶nnen Seiten horizontal, vertikal oder in einem Raster unterteilen, um aus einer Seite mehrere neue Seiten zu machen.</p>
      <p>Besonders nÃ¼tzlich fÃ¼r Scans, bei denen mehrere Dokumente (z. B. Quittungen) auf einer Seite liegen, oder um groÃŸformatige PlÃ¤ne handlich zu machen.</p>
    `,
    howToUse: [
      { step: 1, title: 'PDF hochladen', description: 'Laden Sie das PDF-Dokument hoch.' },
      { step: 2, title: 'Teilung festlegen', description: 'WÃ¤hlen Sie zwischen horizontaler/vertikaler Teilung oder einem Gitter (z. B. 2x2).' },
      { step: 3, title: 'Schneiden', description: 'Laden Sie das PDF mit den nun unterteilten Einzelseiten herunter.' },
    ],
    useCases: [
      { title: 'Scans trennen', description: 'Teilen Sie eine Seite mit mehreren eingescannten Belegen in Einzelbilder.', icon: 'scissors' },
      { title: 'GroÃŸformate anpassen', description: 'Schneiden Sie ein A3-Dokument in zwei A4-Seiten.', icon: 'maximize-2' },
      { title: 'Karten erstellen', description: 'Unterteilen Sie Seiten in visitenkartengroÃŸe Abschnitte.', icon: 'grid' },
    ],
    faq: [
      { question: 'Sind die Schnitte prÃ¤zise?', answer: 'Ja, das Tool teilt die Seite exakt nach Ihren Vorgaben auf.' },
      { question: 'Was passiert mit Text auf der Schnittlinie?', answer: 'Inhalte direkt auf der Linie werden getrennt; achten Sie auf ausreichende AbstÃ¤nde.' },
      { question: 'Kann ich nur bestimmte Seiten teilen?', answer: 'Ja, Sie kÃ¶nnen die Teilung auf das gesamte Dokument oder Seitenauswahlen anwenden.' },
    ],
  },

  'n-up-pdf': {
    title: 'N-Up (Mehrere Seiten pro Blatt)',
    metaDescription: 'Drucken Sie mehrere PDF-Seiten auf ein einzelnes Blatt. Erstellen Sie 2-Up, 4-Up oder individuelle Layouts.',
    description: `
      <p>N-Up PDF ordnet mehrere Seiten Ihres Dokuments auf einem einzigen Blatt an (z. B. 2, 4, 6 oder 9 Seiten pro Blatt). Dies spart Papier beim Drucken und ist ideal fÃ¼r Handouts.</p>
    `,
    howToUse: [
      { step: 1, title: 'PDF hochladen', description: 'WÃ¤hlen Sie das zu druckende Dokument.' },
      { step: 2, title: 'Layout wÃ¤hlen', description: 'Entscheiden Sie sich fÃ¼r ein Raster (z. B. 2x2 fÃ¼r 4 Seiten pro Blatt).' },
      { step: 3, title: 'Generieren', description: 'Laden Sie das optimierte Layout herunter.' },
    ],
    useCases: [
      { title: 'Papier sparen', description: 'Reduzieren Sie den Papierverbrauch beim Korrekturlesen.', icon: 'leaf' },
      { title: 'PrÃ¤sentations-Handouts', description: 'Erstellen Sie kompakte Ãœbersichten Ihrer Folien.', icon: 'file-text' },
      { title: 'BroschÃ¼ren-Vorbereitung', description: 'Ordnen Sie Seiten fÃ¼r spezielle Druckformate an.', icon: 'eye' },
    ],
    faq: [
      { question: 'Bleibt die Reihenfolge erhalten?', answer: 'Ja, die Seiten werden standardmÃ¤ÃŸig von links nach rechts und oben nach unten angeordnet.' },
      { question: 'Kann ich RÃ¤nder hinzufÃ¼gen?', answer: 'Ja, Sie kÃ¶nnen AbstÃ¤nde zwischen den einzelnen Kacheln festlegen.' },
      { question: 'Wird die QualitÃ¤t schlechter?', answer: 'Nein, die Seiten werden lediglich verkleinert, die Details bleiben scharf.' },
    ],
  },

  'reverse-pages': {
    title: 'Seitenreihenfolge umkehren',
    metaDescription: 'Kehren Sie die Reihenfolge der PDF-Seiten um. Spiegeln Sie das Dokument von hinten nach vorne.',
    description: `
      <p>Dieses Tool dreht die gesamte Seitenreihenfolge Ihres PDFs um. Die letzte Seite wird zur ersten, die vorletzte zur zweiten usw. Ideal fÃ¼r Dokumente, die falsch herum eingescannt wurden.</p>
    `,
    howToUse: [
      { step: 1, title: 'PDF hochladen', description: 'WÃ¤hlen Sie die Datei aus.' },
      { step: 2, title: 'Bereich wÃ¤hlen', description: 'WÃ¤hlen Sie das gesamte Dokument oder nur einen Teilbereich zum Umkehren.' },
      { step: 3, title: 'Umkehren', description: 'Speichern Sie das PDF mit der neuen Sortierung.' },
    ],
    useCases: [
      { title: 'Scan-Fehler beheben', description: 'Korrigieren Sie Stapel-Scans, die in der falschen Reihenfolge eingelesen wurden.', icon: 'refresh-cw' },
      { title: 'Druckvorbereitung', description: 'Bereiten Sie Dokumente fÃ¼r Drucker vor, die Seiten in umgekehrter Folge ausgeben.', icon: 'printer' },
      { title: 'PrÃ¼fprozesse', description: 'Betrachten Sie Dokumente schnell aus einer anderen Perspektive.', icon: 'arrow-up-down' },
    ],
    faq: [
      { question: 'Werden Lesezeichen angepasst?', answer: 'Ja, die interne Verlinkung der Lesezeichen wird automatisch auf die neuen Seitenpositionen aktualisiert.' },
      { question: 'Ist das das Gleiche wie Drehen?', answer: 'Nein, Drehen Ã¤ndert die Ausrichtung der Seite, Umkehren Ã¤ndert die Position im Dokument.' },
      { question: 'Kann ich nur das Ende umdrehen?', answer: 'Ja, Sie kÃ¶nnen einen spezifischen Seitenbereich (z. B. Seite 10-20) definieren.' },
    ],
  },

  'compare-pdfs': {
    title: 'PDFs vergleichen',
    metaDescription: 'Vergleichen Sie zwei PDF-Dokumente. Lassen Sie sich Unterschiede zwischen Versionen farblich hervorheben.',
    description: `
      <p>Analysieren Sie zwei Versionen eines Dokuments auf einen Blick. Das Tool markiert TextÃ¤nderungen, HinzufÃ¼gungen und LÃ¶schungen farblich, sodass Sie Revisionen sofort prÃ¼fen kÃ¶nnen.</p>
    `,
    howToUse: [
      { step: 1, title: 'Zwei PDFs hochladen', description: 'Laden Sie das Original und die bearbeitete Version hoch.' },
      { step: 2, title: 'Vergleich starten', description: 'Das Tool analysiert beide Dateien auf Text- und Layout-Differenzen.' },
      { step: 3, title: 'Ergebnisse prÃ¼fen', description: 'Betrachten Sie die Highlights direkt im Browser oder laden Sie einen Bericht herunter.' },
    ],
    useCases: [
      { title: 'VertragsprÃ¼fung', description: 'Finden Sie versteckte Ã„nderungen in neuen VertragsentwÃ¼rfen.', icon: 'file-text' },
      { title: 'Lektorat', description: 'Kontrollieren Sie, ob alle KorrekturwÃ¼nsche korrekt umgesetzt wurden.', icon: 'git-compare' },
      { title: 'QualitÃ¤tssicherung', description: 'Stellen Sie sicher, dass beim Konvertieren keine Inhalte verloren gingen.', icon: 'check-circle' },
    ],
    faq: [
      { question: 'Was wird erkannt?', answer: 'TextÃ¤nderungen, gelÃ¶schte Abschnitte und oft auch verschobene Bilder.' },
      { question: 'Geht das auch bei Scans?', answer: 'DafÃ¼r mÃ¼ssen die Scans zuerst per OCR lesbar gemacht werden.' },
      { question: 'Wie werden Unterschiede gezeigt?', answer: 'Meist durch farbige Unterlegungen (Rot fÃ¼r gelÃ¶scht, GrÃ¼n fÃ¼r neu).' },
    ],
  },// ==================== OPTIMIZE & REPAIR ====================
  'fix-page-size': {
    title: 'SeitengrÃ¶ÃŸe vereinheitlichen',
    metaDescription: 'Standardisieren Sie PDF-SeitengrÃ¶ÃŸen. Konvertieren Sie alle Seiten in ein einheitliches Format.',
    description: `
      <p>Bringen Sie alle Seiten Ihres PDFs auf ein einheitliches Format. Dieses Tool konvertiert Dokumente mit gemischten SeitengrÃ¶ÃŸen in ein konsistentes Format fÃ¼r eine professionelle PrÃ¤sentation oder den Druck.</p>
      <p>WÃ¤hlen Sie aus StandardgrÃ¶ÃŸen wie A4 oder US-Letter oder definieren Sie eigene MaÃŸe. Der Inhalt wird dabei passgenau skaliert oder zentriert.</p>
    `,
    howToUse: [
      { step: 1, title: 'PDF hochladen', description: 'WÃ¤hlen Sie das PDF mit unterschiedlichen Formaten aus.' },
      { step: 2, title: 'Zielformat wÃ¤hlen', description: 'WÃ¤hlen Sie A4, Letter oder geben Sie eigene MaÃŸe in mm/Zoll ein.' },
      { step: 3, title: 'Anwenden', description: 'Laden Sie das PDF mit den nun einheitlichen SeitenmaÃŸen herunter.' },
    ],
    useCases: [
      { title: 'Druckvorbereitung', description: 'Stellen Sie sicher, dass alle Seiten ohne Skalierungsfehler gedruckt werden.', icon: 'printer' },
      { title: 'Dokumenten-Cleanup', description: 'Korrigieren Sie unschÃ¶ne Format-Mixe nach dem ZusammenfÃ¼gen verschiedener Dateien.', icon: 'file-check' },
      { title: 'Professionelle Dossiers', description: 'Erstellen Sie einheitliche Unterlagen fÃ¼r Kunden oder BehÃ¶rden.', icon: 'briefcase' },
    ],
    faq: [
      { question: 'Wird der Inhalt verzerrt?', answer: 'Nein, Sie kÃ¶nnen wÃ¤hlen, ob der Inhalt proportional skaliert oder lediglich zentriert werden soll.' },
      { question: 'Kann ich das SeitenverhÃ¤ltnis beibehalten?', answer: 'Ja, das Tool bietet Optionen zur intelligenten Anpassung ohne Verzerrung.' },
      { question: 'Welche GrÃ¶ÃŸen sind verfÃ¼gbar?', answer: 'Alle gÃ¤ngigen ISO-Formate (A0-A5), US-Formate und benutzerdefinierte MaÃŸe.' },
    ],
  },

  'linearize-pdf': {
    title: 'PDF fÃ¼r Web optimieren',
    metaDescription: 'PDF fÃ¼r schnelle Web-Anzeige optimieren. Aktivieren Sie das progressive Laden (Fast Web View).',
    description: `
      <p>Linearisieren Sie Ihre Dokumente fÃ¼r eine blitzschnelle Anzeige im Web. Linearisierte PDFs (auch "Fast Web View" genannt) kÃ¶nnen bereits im Browser angezeigt werden, bevor die gesamte Datei heruntergeladen ist.</p>
      <p>Dies verbessert die Benutzererfahrung bei groÃŸen Dokumenten erheblich, da die erste Seite sofort erscheint.</p>
    `,
    howToUse: [
      { step: 1, title: 'PDF hochladen', description: 'Laden Sie das Dokument hoch, das online verÃ¶ffentlicht werden soll.' },
      { step: 2, title: 'Optimieren', description: 'Klicken Sie auf "Linearisieren", um die interne Struktur neu zu ordnen.' },
      { step: 3, title: 'Speichern', description: 'Laden Sie das web-optimierte PDF herunter.' },
    ],
    useCases: [
      { title: 'Online-Publikationen', description: 'Optimieren Sie E-Books oder Kataloge fÃ¼r Ihre Website.', icon: 'globe' },
      { title: 'E-Mail-AnhÃ¤nge', description: 'Sorgen Sie dafÃ¼r, dass EmpfÃ¤nger Dokumente ohne VerzÃ¶gerung Ã¶ffnen kÃ¶nnen.', icon: 'mail' },
      { title: 'Cloud-Dokumente', description: 'Bessere Performance fÃ¼r Dokumente, die direkt aus der Cloud gelesen werden.', icon: 'cloud' },
    ],
    faq: [
      { question: 'Was ist Linearisierung?', answer: 'Es ist eine spezielle Art der PDF-Strukturierung, die das "Streamen" des Inhalts ermÃ¶glicht.' },
      { question: 'Wird die Datei dadurch kleiner?', answer: 'Nicht zwingend, manchmal wird sie minimal grÃ¶ÃŸer, lÃ¤dt aber gefÃ¼hlt deutlich schneller.' },
      { question: 'Ist das Format kompatibel?', answer: 'Ja, linearisierte PDFs funktionieren in jedem Standard-PDF-Reader.' },
    ],
  },

  'repair-pdf': {
    title: 'PDF reparieren',
    metaDescription: 'BeschÃ¤digte PDF-Dateien reparieren. Stellen Sie Inhalte aus defekten Dokumenten wieder her.',
    description: `
      <p>Versuchen Sie, beschÃ¤digte oder korrupte PDF-Dateien zu retten. Dieses Tool analysiert die Dokumentenstruktur und baut diese neu auf, um so viele Inhalte wie mÃ¶glich wiederherzustellen.</p>
      <p>NÃ¼tzlich bei Dateien, die sich nicht Ã¶ffnen lassen, Fehlermeldungen anzeigen oder beim Download beschÃ¤digt wurden.</p>
    `,
    howToUse: [
      { step: 1, title: 'Defektes PDF hochladen', description: 'WÃ¤hlen Sie die Datei aus, die Fehlermeldungen verursacht.' },
      { step: 2, title: 'Reparatur starten', description: 'Das Tool versucht, die Cross-Reference-Table und die Objektstruktur zu fixen.' },
      { step: 3, title: 'Ergebnis prÃ¼fen', description: 'Laden Sie die reparierte Version herunter und prÃ¼fen Sie den Inhalt.' },
    ],
    useCases: [
      { title: 'Dateirettung', description: 'Stellen Sie wichtige Daten aus PDFs wieder her, die nicht mehr aufgehen.', icon: 'refresh-cw' },
      { title: 'Fehlerbehebung', description: 'Fixen Sie Dateien, die in manchen Viewern falsch angezeigt werden.', icon: 'wrench' },
      { title: 'Datenwiederherstellung', description: 'Rettungsversuch fÃ¼r unvollstÃ¤ndige Downloads oder Ãœbertragungsfehler.', icon: 'file-check' },
    ],
    faq: [
      { question: 'Klappt die Reparatur immer?', answer: 'Der Erfolg hÃ¤ngt vom Grad der BeschÃ¤digung ab. Bei schwerem Datenverlust ist eine Rettung leider nicht immer mÃ¶glich.' },
      { question: 'Bleiben alle Bilder erhalten?', answer: 'Das Tool versucht alles zu retten, bei defekten Objekten kann es jedoch zu Verlusten kommen.' },
      { question: 'Ist mein Original sicher?', answer: 'Ja, Sie arbeiten an einer Kopie; Ihr lokales Original bleibt unverÃ¤ndert.' },
    ],
  },

  // ==================== SECURE PDF ====================
  'encrypt-pdf': {
    title: 'PDF verschlÃ¼sseln',
    metaDescription: 'PDF mit Passwort schÃ¼tzen. FÃ¼gen Sie VerschlÃ¼sselung hinzu und legen Sie Berechtigungen fest.',
    description: `
      <p>SchÃ¼tzen Sie Ihre vertraulichen Dokumente mit einer starken VerschlÃ¼sselung. Legen Sie ein Benutzer-Passwort zum Ã–ffnen und ein Inhaber-Passwort zum Schutz der Berechtigungen fest.</p>
      <p>WÃ¤hlen Sie zwischen 128-Bit oder 256-Bit AES-VerschlÃ¼sselung fÃ¼r hÃ¶chste Sicherheitsstandards.</p>
    `,
    howToUse: [
      { step: 1, title: 'PDF hochladen', description: 'WÃ¤hlen Sie die zu schÃ¼tzende Datei aus.' },
      { step: 2, title: 'PasswÃ¶rter setzen', description: 'Geben Sie ein starkes Passwort ein und legen Sie fest, was erlaubt ist (z. B. Drucken).' },
      { step: 3, title: 'Sichern', description: 'Laden Sie das verschlÃ¼sselte PDF herunter.' },
    ],
    useCases: [
      { title: 'Vertrauliche Daten', description: 'SchÃ¼tzen Sie Finanzberichte oder persÃ¶nliche Unterlagen.', icon: 'lock' },
      { title: 'Sicherer Versand', description: 'Versenden Sie VertrÃ¤ge geschÃ¼tzt per E-Mail.', icon: 'shield' },
      { title: 'Nutzungskontrolle', description: 'Verhindern Sie, dass Unbefugte Ihre Inhalte kopieren oder drucken.', icon: 'key' },
    ],
    faq: [
      { question: 'Was ist der Unterschied bei den PasswÃ¶rtern?', answer: 'Das Benutzer-Passwort ist zum Lesen; das Inhaber-Passwort schÃ¼tzt die Rechte-Einstellungen.' },
      { question: 'Wie sicher ist die VerschlÃ¼sselung?', answer: 'Wir nutzen AES-VerschlÃ¼sselung, die als Industriestandard gilt und extrem sicher ist.' },
      { question: 'Kann ich das Passwort spÃ¤ter Ã¤ndern?', answer: 'Ja, mit dem Inhaber-Passwort kÃ¶nnen Sie den Schutz jederzeit anpassen oder entfernen.' },
    ],
  },

  'decrypt-pdf': {
    title: 'PDF entsperren',
    metaDescription: 'Passwort aus PDF-Dateien entfernen. Entsperren Sie geschÃ¼tzte Dokumente dauerhaft.',
    description: `
      <p>Entfernen Sie den Passwortschutz dauerhaft aus Ihren PDFs. Sobald Sie das korrekte Passwort einmal eingegeben haben, erstellt das Tool eine ungeschÃ¼tzte Kopie fÃ¼r den einfachen Zugriff.</p>
      <p>Hinweis: Sie mÃ¼ssen das aktuelle Passwort kennen. Dieses Tool dient nicht zum Knacken fremder PasswÃ¶rter.</p>
    `,
    howToUse: [
      { step: 1, title: 'GeschÃ¼tztes PDF wÃ¤hlen', description: 'Laden Sie die passwortgeschÃ¼tzte Datei hoch.' },
      { step: 2, title: 'Passwort eingeben', description: 'Geben Sie das gÃ¼ltige Passwort ein, um die Datei zu autorisieren.' },
      { step: 3, title: 'Entsperren', description: 'Laden Sie die nun vÃ¶llig freie PDF-Version herunter.' },
    ],
    useCases: [
      { title: 'Schutz entfernen', description: 'Machen Sie Dokumente fÃ¼r den internen Gebrauch leichter zugÃ¤nglich.', icon: 'unlock' },
      { title: 'Archivierung', description: 'Entfernen Sie PasswÃ¶rter vor der Langzeitarchivierung, um Zugriffsprobleme zu vermeiden.', icon: 'archive' },
      { title: 'Workflow-Vereinfachung', description: 'Erstellen Sie offene Kopien fÃ¼r Team-Mitglieder.', icon: 'share-2' },
    ],
    faq: [
      { question: 'Kann das Tool unbekannte PasswÃ¶rter knacken?', answer: 'Nein, aus SicherheitsgrÃ¼nden mÃ¼ssen Sie das Passwort besitzen, um es entfernen zu kÃ¶nnen.' },
      { question: 'Wird das Original geÃ¤ndert?', answer: 'Nein, es wird eine neue, ungeschÃ¼tzte Datei generiert.' },
      { question: 'Gehen Daten verloren?', answer: 'Nein, der Inhalt bleibt exakt gleich, lediglich die Sicherheitsabfrage fÃ¤llt weg.' },
    ],
  },

  'edit-metadata': {
    title: 'Metadaten bearbeiten',
    metaDescription: 'Dokumenteigenschaften von PDFs Ã¤ndern. Bearbeiten Sie Titel, Autor, Betreff und Keywords.',
    description: `
      <p>Passen Sie die versteckten Informationen Ihres PDFs an. Ã„ndern oder lÃ¶schen Sie Titel, Autor, Thema und Schlagworte, um die Datei professionell zu prÃ¤sentieren oder Ihre PrivatsphÃ¤re zu schÃ¼tzen.</p>
    `,
    howToUse: [
      { step: 1, title: 'PDF hochladen', description: 'WÃ¤hlen Sie Ihr Dokument aus.' },
      { step: 2, title: 'Felder ausfÃ¼llen', description: 'Geben Sie neue Informationen fÃ¼r Titel, Autor und andere Felder ein.' },
      { step: 3, title: 'Speichern', description: 'Laden Sie das PDF mit den aktualisierten Metadaten herunter.' },
    ],
    useCases: [
      { title: 'SEO-Optimierung', description: 'Hinterlegen Sie Keywords und Beschreibungen direkt in der PDF-Datei.', icon: 'search' },
      { title: 'Professionelle Kennzeichnung', description: 'Setzen Sie den korrekten Firmennamen als Autor.', icon: 'user' },
      { title: 'Vorbereitung zur VerÃ¶ffentlichung', description: 'Sorgen Sie fÃ¼r saubere Dokumenteigenschaften vor dem Upload.', icon: 'file-check' },
    ],
    faq: [
      { question: 'Welche Felder sind Ã¤nderbar?', answer: 'Titel, Autor, Betreff, StichwÃ¶rter, Ersteller und Produzent.' },
      { question: 'Kann ich alle Daten lÃ¶schen?', answer: 'Ja, Sie kÃ¶nnen die Felder auch leer lassen, um alle Informationen zu entfernen.' },
      { question: 'Werden auch XMP-Daten geÃ¤ndert?', answer: 'Ja, das Tool aktualisiert sowohl Standard- als auch XMP-Metadaten.' },
    ],
  },

  'pdf-to-pptx': {
    title: 'PDF in PowerPoint',
    metaDescription: 'PDF in PowerPoint (PPTX) PrÃ¤sentation konvertieren. Jede Seite wird zu einer hochwertigen Folie.',
    description: `
      <p>PDF in PowerPoint konvertiert Ihre PDF-Dokumente in bearbeitbare PowerPoint-PrÃ¤sentationen (PPTX). Jede PDF-Seite wird in eine hochwertige Folie umgewandelt, wobei das visuelle Layout fast perfekt erhalten bleibt.</p>
      <p>Dieses Tool ist ideal fÃ¼r die Umwandlung von Berichten, Handouts oder anderen PDF-Inhalten in ein PrÃ¤sentationsformat.</p>
    `,
    howToUse: [
      { step: 1, title: 'PDF hochladen', description: 'Ziehen Sie Ihre PDF-Datei hierher oder klicken Sie zum AuswÃ¤hlen.' },
      { step: 2, title: 'QualitÃ¤t wÃ¤hlen', description: 'WÃ¤hlen Sie die BildqualitÃ¤t (DPI) fÃ¼r die Folien.' },
      { step: 3, title: 'Konvertieren', description: 'Klicken Sie auf Konvertieren, um Ihre PowerPoint-PrÃ¤sentation zu erstellen.' },
    ],
    useCases: [
      { title: 'PrÃ¤sentationserstellung', description: 'Wandeln Sie PDF-Berichte in Folien fÃ¼r Meetings um.', icon: 'presentation' },
      { title: 'Schulungsmaterial', description: 'Machen Sie aus PDF-Schulungsunterlagen interaktive PowerPoint-PrÃ¤sentationen.', icon: 'book-open' },
      { title: 'Inhalte wiederverwenden', description: 'Nutzen Sie bestehende PDF-Inhalte als Basis fÃ¼r neue PrÃ¤sentationen.', icon: 'refresh-cw' },
    ],
    faq: [
      { question: 'Sind die Folien bearbeitbar?', answer: 'Jede Folie enthÃ¤lt ein Bild der PDF-Seite. Sie kÃ¶nnen Text und Elemente darÃ¼berlegen.' },
      { question: 'Welche DPI sollte ich wÃ¤hlen?', answer: 'Nutzen Sie 150 DPI fÃ¼r Bildschirme und 300 DPI fÃ¼r den Druck.' },
      { question: 'Gehen mehrseitige PDFs?', answer: 'Ja, jede Seite des PDFs wird zu einer separaten Folie.' },
    ],
  },

  'pdf-to-excel': {
    title: 'PDF in Excel',
    metaDescription: 'PDF in Excel-Tabelle konvertieren. Tabellen in XLSX-Format extrahieren.',
    description: `
      <p>PDF in Excel konvertiert Ihre PDF-Dokumente in bearbeitbare Microsoft Excel-Tabellen (XLSX). Das Tool erkennt automatisch Tabellen in Ihrem PDF und extrahiert sie in separate ArbeitsblÃ¤tter.</p>
      <p>Ideal fÃ¼r die Analyse von Finanzberichten, Rechnungen oder anderen tabellarischen Daten.</p>
    `,
    howToUse: [
      { step: 1, title: 'PDF hochladen', description: 'Laden Sie Ihre PDF-Datei hoch.' },
      { step: 2, title: 'Verarbeiten', description: 'Das Tool identifiziert und extrahiert Tabellen automatisch.' },
      { step: 3, title: 'Excel herunterladen', description: 'Laden Sie die Excel-Datei mit den extrahierten Daten herunter.' },
    ],
    useCases: [
      { title: 'Finanzanalyse', description: 'Konvertieren Sie KontoauszÃ¼ge oder Rechnungen fÃ¼r die Analyse.', icon: 'trending-up' },
      { title: 'Datenextraktion', description: 'Holen Sie Daten aus Forschungsberichten in Excel.', icon: 'database' },
      { title: 'Inventarlisten', description: 'Wandeln Sie Bestandslisten von PDF in Tabellen um.', icon: 'clipboard' },
    ],
    faq: [
      { question: 'Wie werden Tabellen behandelt?', answer: 'Erkannte Tabellen werden auf entsprechende ArbeitsblÃ¤tter in der Excel-Datei verteilt.' },
      { question: 'Was wenn keine Tabellen da sind?', answer: 'Ein Infoblatt wird erstellt, falls keine Tabellen gefunden werden.' },
      { question: 'Bleibt die Formatierung erhalten?', answer: 'Die Daten bleiben erhalten, aber komplexe Formatierungen werden fÃ¼r die Tabelle vereinfacht.' },
    ],
  },

  'email-to-pdf': {
    title: 'E-Mail zu PDF',
    metaDescription: 'Konvertieren Sie E-Mail-Dateien (.eml, .msg) in PDF-Dokumente. Formatierung, Inline-Bilder, anklickbare Links und eingebettete AnhÃ¤nge bleiben erhalten.',
    description: `
      <p>E-Mail zu PDF konvertiert Ihre E-Mail-Dateien (.eml und .msg Formate) in gut formatierte PDF-Dokumente. Das Tool bewahrt die E-Mail-Header-Informationen, den Nachrichtentext, Inline-Bilder mit CID-Ersetzung, anklickbare Links und bettet AnhÃ¤nge direkt in das PDF ein.</p>
      <p>Passen Sie die Ausgabeoptionen an, einschlieÃŸlich SeitengrÃ¶ÃŸe (A4, Letter, Legal), Datumsformatierung mit ZeitzonenunterstÃ¼tzung und ob CC/BCC-Felder und Anhangsinformationen einbezogen werden sollen.</p>
      <p>Die gesamte Konvertierung erfolgt lokal in Ihrem Browser, sodass Ihre E-Mails privat und sicher bleiben.</p>
    `,
    howToUse: [
      { step: 1, title: 'E-Mail-Datei hochladen', description: 'Laden Sie Ihre .eml oder .msg E-Mail-Datei hoch.' },
      { step: 2, title: 'Optionen konfigurieren', description: 'Legen Sie SeitengrÃ¶ÃŸe, Datumsformat, Zeitzone fest und wÃ¤hlen Sie, welche Felder einbezogen werden sollen.' },
      { step: 3, title: 'Konvertieren und Herunterladen', description: 'Konvertieren Sie in PDF mit eingebetteten AnhÃ¤ngen und laden Sie das Ergebnis herunter.' },
    ],
    useCases: [
      { title: 'Rechtliche Aufzeichnungen', description: 'Archivieren Sie wichtige E-Mails als PDF mit eingebetteten AnhÃ¤ngen fÃ¼r rechtliche Dokumentation.', icon: 'scale' },
      { title: 'GeschÃ¤ftsarchive', description: 'Konvertieren Sie GeschÃ¤ftskorrespondenz in PDF fÃ¼r langfristige Aufbewahrung.', icon: 'briefcase' },
      { title: 'Beweissicherung', description: 'Speichern Sie E-Mail-Beweise mit Inline-Bildern und AnhÃ¤ngen in einem nicht bearbeitbaren PDF-Format.', icon: 'shield' },
    ],
    faq: [
      { question: 'Welche E-Mail-Formate werden unterstÃ¼tzt?', answer: 'Sowohl .eml (RFC 822) als auch .msg (Microsoft Outlook) Dateien werden vollstÃ¤ndig unterstÃ¼tzt.' },
      { question: 'Sind AnhÃ¤nge enthalten?', answer: 'Ja! AnhÃ¤nge werden direkt in die PDF-Datei eingebettet. Sie kÃ¶nnen sie mit einem kompatiblen PDF-Reader aus dem PDF extrahieren.' },
      { question: 'Werden Inline-Bilder angezeigt?', answer: 'Ja, Inline-Bilder, die Ã¼ber CID (Content-ID) referenziert werden, werden automatisch in base64-Daten-URIs konvertiert und im PDF angezeigt.' },
      { question: 'Sind Links anklickbar?', answer: 'Ja, alle HTML-Links (<a>-Tags) und URLs in Klartext-E-Mails werden in anklickbare Links im PDF konvertiert.' },
      { question: 'Bleibt die E-Mail-Formatierung erhalten?', answer: 'Ja, HTML-E-Mails behalten ihre Formatierung so weit wie mÃ¶glich bei, einschlieÃŸlich Stile, Bilder und Links.' },
    ],
  },

  'djvu-to-pdf': {
    title: 'DJVU zu PDF',
    metaDescription: 'Konvertieren Sie DJVU-Dokumentdateien in PDF. Hochwertiges Rendering fÃ¼r gescannte Dokumente und BÃ¼cher.',
    description: `
      <p>DJVU zu PDF konvertiert DjVu-Dokumentdateien in hochwertige PDF-Dokumente. DjVu ist ein Computerdateiformat, das hauptsÃ¤chlich zum Speichern gescannter Dokumente entwickelt wurde, insbesondere solcher, die eine Kombination aus Text, Strichzeichnungen und Fotografien enthalten.</p>
      <p>Dieses Tool rendert jede Seite Ihrer DJVU-Datei in Ihrer gewÃ¤hlten DPI (Punkte pro Zoll) und kombiniert sie zu einem durchsuchbaren PDF-Dokument. Perfekt zum Konvertieren gescannter BÃ¼cher, technischer HandbÃ¼cher und Archivdokumente.</p>
      <p>Die gesamte Konvertierung erfolgt lokal in Ihrem Browser, sodass Ihre Dokumente privat und sicher bleiben.</p>
    `,
    howToUse: [
      { step: 1, title: 'DJVU-Datei hochladen', description: 'Ziehen Sie Ihre .djvu- oder .djv-Datei per Drag & Drop oder klicken Sie, um von Ihrem GerÃ¤t auszuwÃ¤hlen.' },
      { step: 2, title: 'Optionen konfigurieren', description: 'WÃ¤hlen Sie Ausgabe-DPI (72, 150 oder 300) und BildqualitÃ¤t fÃ¼r das PDF.' },
      { step: 3, title: 'Konvertieren und Herunterladen', description: 'Klicken Sie auf In PDF konvertieren und laden Sie Ihr konvertiertes Dokument herunter.' },
    ],
    useCases: [
      { title: 'Archivdokumente', description: 'Konvertieren Sie DJVU-Archive in universelles PDF-Format.', icon: 'archive' },
      { title: 'Gescannte BÃ¼cher teilen', description: 'Teilen Sie gescannte BÃ¼cher im PDF-Format fÃ¼r breitere KompatibilitÃ¤t.', icon: 'share-2' },
      { title: 'Dokumente drucken', description: 'Konvertieren Sie DJVU in hochwertiges PDF zum Drucken.', icon: 'printer' },
    ],
    faq: [
      { question: 'Was ist das DJVU-Format?', answer: 'DjVu ist ein Dateiformat, das zum Speichern gescannter Dokumente entwickelt wurde, insbesondere solcher mit Text, Zeichnungen und Bildern. Es bietet eine bessere Kompression als PDF fÃ¼r gescannte Inhalte.' },
      { question: 'Welche DPI soll ich wÃ¤hlen?', answer: '72 DPI eignet sich fÃ¼r die Webansicht, 150 DPI fÃ¼r Standarddokumente und 300 DPI fÃ¼r hochwertigen Druck.' },
      { question: 'Wird der Text durchsuchbar sein?', answer: 'Der Text wird als Bilder gerendert. Wenn Sie durchsuchbaren Text benÃ¶tigen, sollten Sie unser OCR-PDF-Tool nach der Konvertierung verwenden.' },
    ],
  },

  'fb2-to-pdf': {
    title: 'FB2 zu PDF',
    metaDescription: 'Konvertieren Sie FictionBook (FB2) E-Books in PDF. UnterstÃ¼tzt mehrere Dateien mit hochwertigem Rendering.',
    description: `
      <p>FB2 zu PDF konvertiert FictionBook (FB2) E-Book-Dateien in hochwertige PDF-Dokumente. FB2 ist ein beliebtes XML-basiertes E-Book-Format, das in Russland und Osteuropa weit verbreitet ist.</p>
      <p>Dieses Tool unterstÃ¼tzt sowohl .fb2- als auch .fb2.zip-Dateien und kann mehrere Dateien gleichzeitig verarbeiten. Es bewahrt die Textformatierung, Bilder und die Kapitelstruktur Ihrer E-Books.</p>
      <p>Die gesamte Konvertierung erfolgt lokal in Ihrem Browser mit fortschrittlicher Rendering-Technologie, sodass Ihre BÃ¼cher privat bleiben und die Konvertierung schnell ist.</p>
    `,
    howToUse: [
      { step: 1, title: 'FB2-Dateien hochladen', description: 'Ziehen Sie eine oder mehrere .fb2- oder .fb2.zip-Dateien per Drag & Drop oder klicken Sie, um von Ihrem GerÃ¤t auszuwÃ¤hlen.' },
      { step: 2, title: 'QualitÃ¤t auswÃ¤hlen', description: 'WÃ¤hlen Sie AusgabequalitÃ¤t: Niedrig (72 DPI), Mittel (150 DPI) oder Hoch (300 DPI).' },
      { step: 3, title: 'Konvertieren und Herunterladen', description: 'Klicken Sie auf In PDF konvertieren und laden Sie Ihr(e) konvertierte(s) Dokument(e) herunter.' },
    ],
    useCases: [
      { title: 'E-Books drucken', description: 'Konvertieren Sie FB2-E-Books in PDF fÃ¼r physischen Druck.', icon: 'printer' },
      { title: 'Stapelkonvertierung', description: 'Konvertieren Sie mehrere FB2-Dateien gleichzeitig in PDF.', icon: 'layers' },
      { title: 'Universelles Format', description: 'Teilen Sie E-Books im PDF-Format, das auf jedem GerÃ¤t funktioniert.', icon: 'share-2' },
    ],
    faq: [
      { question: 'Kann ich mehrere FB2-Dateien gleichzeitig konvertieren?', answer: 'Ja! Dieses Tool unterstÃ¼tzt die Stapelkonvertierung von bis zu 20 FB2-Dateien gleichzeitig.' },
      { question: 'Werden .fb2.zip-Dateien unterstÃ¼tzt?', answer: 'Ja, das Tool extrahiert und konvertiert automatisch FB2-Dateien aus .fb2.zip-Archiven.' },
      { question: 'Bleibt die Formatierung erhalten?', answer: 'Ja! Das Tool verwendet natives FB2-Rendering und bewahrt Textformatierung, Bilder und Kapitelstruktur mit hoher Wiedergabetreue.' },
    ],
  },
  'cbz-to-pdf': {
    title: 'CBZ zu PDF',
    metaDescription: 'Konvertieren Sie Comic-Archive (CBZ) in PDF. Bewahren Sie Bildreihenfolge und QualitÃ¤t fÃ¼r digitale Comics.',
    description: `
      <p>CBZ zu PDF konvertiert Comic-Archivdateien in PDF-Dokumente. Das Tool extrahiert alle Bilder aus dem CBZ-Archiv und kompiliert sie in ein PDF, wobei die korrekte Lesereihenfolge beibehalten wird.</p>
      <p>WÃ¤hlen Sie aus verschiedenen SeitengrÃ¶ÃŸenoptionen, einschlieÃŸlich Originalbildabmessungen oder standardisierten Comic-GrÃ¶ÃŸen. Perfekt zum Lesen von Comics auf GerÃ¤ten, die PDF, aber nicht CBZ unterstÃ¼tzen.</p>
      <p>Die gesamte Konvertierung erfolgt lokal in Ihrem Browser, sodass Ihre Comics privat bleiben.</p>
    `,
    howToUse: [
      { step: 1, title: 'CBZ-Datei hochladen', description: 'Laden Sie Ihre .cbz Comic-Archivdatei hoch.' },
      { step: 2, title: 'Optionen wÃ¤hlen', description: 'WÃ¤hlen Sie SeitengrÃ¶ÃŸe und BildqualitÃ¤tseinstellungen.' },
      { step: 3, title: 'Konvertieren und Herunterladen', description: 'Konvertieren Sie in PDF und laden Sie Ihren Comic herunter.' },
    ],
    useCases: [
      { title: 'E-Reader-KompatibilitÃ¤t', description: 'Konvertieren Sie CBZ in PDF fÃ¼r E-Reader, die nur PDF unterstÃ¼tzen.', icon: 'book' },
      { title: 'Comic-Archive', description: 'Erstellen Sie PDF-Archive Ihrer digitalen Comic-Sammlung.', icon: 'archive' },
      { title: 'Druckvorbereitung', description: 'Konvertieren Sie digitale Comics in PDF zum Drucken.', icon: 'printer' },
    ],
    faq: [
      { question: 'Was ist das CBZ-Format?', answer: 'CBZ ist ein ZIP-Archiv mit Comic-Seiten als Bilddateien, umbenannt mit .cbz-Erweiterung.' },
      { question: 'Bleibt die BildqualitÃ¤t erhalten?', answer: 'Ja, Bilder werden in ihrer OriginalqualitÃ¤t in das PDF eingebettet.' },
      { question: 'Werden verschachtelte Ordner unterstÃ¼tzt?', answer: 'Ja, Bilder aus allen Ordnern im Archiv werden extrahiert und sortiert.' },
    ],
  },

  'pdf-booklet': {
    title: 'PDF-BroschÃ¼ren-Ersteller',
    metaDescription: 'Erstellen Sie BroschÃ¼renlayouts aus PDF zum Drucken. Ordnen Sie Seiten fÃ¼r RÃ¼ckstich-Bindung mit mehreren Rasteroptionen an.',
    description: `
      <p>Der PDF-BroschÃ¼ren-Ersteller ordnet Ihre PDF-Seiten in druckfertige BroschÃ¼renlayouts an. Perfekt zum Erstellen von BroschÃ¼ren, Zines, Heften und rÃ¼ckstichgebundenen Publikationen.</p>
      <p>WÃ¤hlen Sie aus verschiedenen Rastermodi (1x2, 2x2, 2x4, 4x4), PapiergrÃ¶ÃŸen und Ausrichtungsoptionen. Das Tool verarbeitet automatisch das SeitenausschieÃŸen fÃ¼r die richtige Falzreihenfolge.</p>
      <p>Die gesamte Verarbeitung erfolgt lokal in Ihrem Browser, sodass Ihre Dokumente privat bleiben.</p>
    `,
    howToUse: [
      { step: 1, title: 'PDF hochladen', description: 'Laden Sie das PDF-Dokument hoch, das Sie in eine BroschÃ¼re umwandeln mÃ¶chten.' },
      { step: 2, title: 'Layout wÃ¤hlen', description: 'WÃ¤hlen Sie Rastermodus, PapiergrÃ¶ÃŸe, Ausrichtung und Rotationsoptionen.' },
      { step: 3, title: 'Erstellen und Herunterladen', description: 'Generieren Sie das BroschÃ¼renlayout und laden Sie es zum Drucken herunter.' },
    ],
    useCases: [
      { title: 'BroschÃ¼ren', description: 'Erstellen Sie faltfertige BroschÃ¼ren aus Standard-PDF-Dokumenten.', icon: 'book-open' },
      { title: 'Zines', description: 'Produzieren Sie selbstverlegte Zines mit korrektem SeitenausschieÃŸen.', icon: 'book' },
      { title: 'Veranstaltungsprogramme', description: 'Erstellen Sie professionelle Programmhefte fÃ¼r Veranstaltungen.', icon: 'calendar' },
    ],
    faq: [
      { question: 'Was ist RÃ¼ckstich-Bindung?', answer: 'RÃ¼ckstich ist eine Bindemethode, bei der gefaltete BÃ¶gen ineinander gelegt und durch die Falz geheftet werden.' },
      { question: 'Welchen Rastermodus sollte ich verwenden?', answer: '1x2 ist Standard fÃ¼r BroschÃ¼ren. Verwenden Sie 2x2 oder grÃ¶ÃŸer fÃ¼r Mehrfachdruck, um Papier zu sparen.' },
      { question: 'Kann ich das Layout vorab ansehen?', answer: 'Ja, das Tool bietet eine visuelle Vorschau vor der Generierung der finalen BroschÃ¼re.' },
    ],
  },

  'rasterize-pdf': {
    title: 'PDF rastern',
    metaDescription: 'Konvertieren Sie PDF-Seiten in hochwertige Bilder. Exportieren Sie als PNG, JPEG oder WebP mit benutzerdefinierten DPI-Einstellungen.',
    description: `
      <p>PDF rastern konvertiert Ihre PDF-Seiten in hochwertige Rasterbilder. WÃ¤hlen Sie aus PNG-, JPEG- oder WebP-Ausgabeformaten mit voller Kontrolle Ã¼ber DPI- und QualitÃ¤tseinstellungen.</p>
      <p>Perfekt zum Erstellen von Miniaturansichten, Social-Media-Grafiken oder zum Archivieren von PDF-Inhalten als Bilder. UnterstÃ¼tzt Seitenbereichsauswahl und Stapelverarbeitung.</p>
      <p>Die gesamte Verarbeitung erfolgt lokal in Ihrem Browser, sodass Ihre Dokumente privat bleiben.</p>
    `,
    howToUse: [
      { step: 1, title: 'PDF hochladen', description: 'Ziehen Sie Ihre PDF-Datei per Drag & Drop oder klicken Sie zum AuswÃ¤hlen.' },
      { step: 2, title: 'Ausgabe konfigurieren', description: 'WÃ¤hlen Sie DPI, Ausgabeformat (PNG/JPEG/WebP), QualitÃ¤t und Seitenbereich.' },
      { step: 3, title: 'Konvertieren und Herunterladen', description: 'Verarbeiten Sie Seiten und laden Sie Bilder einzeln oder als ZIP-Archiv herunter.' },
    ],
    useCases: [
      { title: 'Social Media', description: 'Konvertieren Sie PDF-Folien in Bilder fÃ¼r Social-Media-Posts.', icon: 'share-2' },
      { title: 'Miniaturansichten', description: 'Generieren Sie Vorschau-Miniaturansichten fÃ¼r PDF-Dokumente.', icon: 'image' },
      { title: 'Web-Publishing', description: 'Konvertieren Sie PDF-Inhalte in webfreundliche Bildformate.', icon: 'globe' },
    ],
    faq: [
      { question: 'Welche DPI sollte ich verwenden?', answer: '72 DPI fÃ¼r Bildschirm, 150 DPI fÃ¼r allgemeine Nutzung, 300 DPI fÃ¼r DruckqualitÃ¤t.' },
      { question: 'Welches Format ist am besten?', answer: 'PNG fÃ¼r QualitÃ¤t/Transparenz, JPEG fÃ¼r kleine GrÃ¶ÃŸe, WebP fÃ¼r moderne Webnutzung.' },
      { question: 'Kann ich bestimmte Seiten konvertieren?', answer: 'Ja, geben Sie Seitenbereiche wie "1-5, 8, 10-15" an, um nur diese Seiten zu konvertieren.' },
    ],
  },

  'markdown-to-pdf': {
    title: 'Markdown zu PDF',
    metaDescription: 'Konvertieren Sie Markdown-Dateien in schÃ¶n formatierte PDF-Dokumente. UnterstÃ¼tzung fÃ¼r GitHub Flavored Markdown und Syntax-Highlighting.',
    description: `
      <p>Markdown zu PDF konvertiert Ihre Markdown-Dateien in professionell gestaltete PDF-Dokumente. UnterstÃ¼tzung fÃ¼r CommonMark und GitHub Flavored Markdown (GFM) einschlieÃŸlich Tabellen, Aufgabenlisten und CodeblÃ¶cken.</p>
      <p>WÃ¤hlen Sie aus mehreren Themes (hell, dunkel, GitHub) und passen Sie SeitengrÃ¶ÃŸe und RÃ¤nder an. CodeblÃ¶cke werden mit Syntax-Highlighting fÃ¼r bessere Lesbarkeit versehen.</p>
      <p>Die gesamte Konvertierung erfolgt lokal in Ihrem Browser, sodass Ihre Inhalte privat bleiben.</p>
    `,
    howToUse: [
      { step: 1, title: 'Markdown-Datei hochladen', description: 'Laden Sie Ihre .md oder .markdown Datei hoch.' },
      { step: 2, title: 'Theme wÃ¤hlen', description: 'WÃ¤hlen Sie ein visuelles Theme und konfigurieren Sie Seiteneinstellungen.' },
      { step: 3, title: 'Konvertieren und Herunterladen', description: 'Generieren Sie das gestaltete PDF und laden Sie es herunter.' },
    ],
    useCases: [
      { title: 'Dokumentation', description: 'Konvertieren Sie README-Dateien und Docs in teilbare PDFs.', icon: 'file-text' },
      { title: 'Notizen-Export', description: 'Exportieren Sie Markdown-Notizen als PDF zum Drucken oder Teilen.', icon: 'edit-3' },
      { title: 'Berichte', description: 'Erstellen Sie Berichte aus Markdown mit professionellem Styling.', icon: 'bar-chart' },
    ],
    faq: [
      { question: 'Wird GitHub Flavored Markdown unterstÃ¼tzt?', answer: 'Ja, Tabellen, Aufgabenlisten, Durchstreichungen und andere GFM-Funktionen werden unterstÃ¼tzt.' },
      { question: 'Kann ich das Styling anpassen?', answer: 'WÃ¤hlen Sie aus voreingestellten Themes oder fÃ¼gen Sie benutzerdefiniertes CSS fÃ¼r volle Kontrolle hinzu.' },
      { question: 'Werden CodeblÃ¶cke hervorgehoben?', answer: 'Ja, CodeblÃ¶cke enthalten Syntax-Highlighting fÃ¼r gÃ¤ngige Sprachen.' },
    ],
  },

  'font-to-outline': {
    title: 'Schrift zu Kontur',
    metaDescription: 'Entfernen Sie SchriftabhÃ¤ngigkeiten aus PDF-Dokumenten durch Konvertierung in hochwertige Bilder. GewÃ¤hrleistet KompatibilitÃ¤t auf allen Systemen.',
    description: `
      <p>Schrift zu Kontur entfernt alle SchriftabhÃ¤ngigkeiten aus Ihrem PDF, indem jede Seite in hochwertige gerasterte Inhalte konvertiert wird. Dies stellt sicher, dass Ihr Dokument auf jedem System genau gleich aussieht, auch wenn die Originalschriften nicht installiert sind.</p>
      <p>Das Tool rendert jede Seite mit Ihrer gewÃ¤hlten DPI (150-600), entfernt eingebettete Schriften und bewahrt dabei das exakte visuelle Erscheinungsbild. Optional kÃ¶nnen Sie eine unsichtbare Textebene hinzufÃ¼gen, um die Durchsuchbarkeit zu erhalten.</p>
      <p>Dies ist wichtig fÃ¼r Druckvorbereitung, plattformÃ¼bergreifende KompatibilitÃ¤t und zur Vermeidung von Schriftlizenzproblemen beim Teilen von Dokumenten. Die gesamte Verarbeitung erfolgt lokal in Ihrem Browser.</p>
    `,
    howToUse: [
      { step: 1, title: 'PDF hochladen', description: 'Laden Sie das PDF mit Schriften hoch, die Sie entfernen mÃ¶chten.' },
      { step: 2, title: 'QualitÃ¤t konfigurieren', description: 'WÃ¤hlen Sie DPI (300 empfohlen fÃ¼r Druck, 150 fÃ¼r Bildschirm). Aktivieren Sie bei Bedarf durchsuchbaren Text.' },
      { step: 3, title: 'Konvertieren und Herunterladen', description: 'Verarbeiten Sie die Datei und laden Sie das schriftunabhÃ¤ngige PDF herunter.' },
    ],
    useCases: [
      { title: 'Druckvorbereitung', description: 'Beseitigen Sie Schriftprobleme bei kommerziellen Druckereien durch Entfernung aller SchriftabhÃ¤ngigkeiten.', icon: 'printer' },
      { title: 'PlattformÃ¼bergreifendes Teilen', description: 'Teilen Sie Dokumente, die auf jedem GerÃ¤t identisch aussehen, unabhÃ¤ngig von installierten Schriften.', icon: 'share-2' },
      { title: 'Schriftlizenzierung', description: 'Entfernen Sie eingebettete Schriften, um Lizenzbedenken beim Verteilen von Dokumenten zu vermeiden.', icon: 'shield' },
    ],
    faq: [
      { question: 'Wie funktioniert das?', answer: 'Das Tool rendert jede Seite in hoher AuflÃ¶sung (Ihre gewÃ¤hlte DPI) und erstellt das PDF aus diesen Bildern neu, entfernt alle SchriftabhÃ¤ngigkeiten und bewahrt dabei das visuelle Erscheinungsbild.' },
      { question: 'Kann ich nach der Konvertierung noch Text auswÃ¤hlen?', answer: 'StandardmÃ¤ÃŸig nein. Text wird Teil des Bildes. Sie kÃ¶nnen jedoch "Durchsuchbaren Text bewahren" aktivieren, um eine unsichtbare Textebene fÃ¼r Such- und Kopierfunktionen hinzuzufÃ¼gen.' },
      { question: 'Welche DPI sollte ich verwenden?', answer: '300 DPI wird fÃ¼r DruckqualitÃ¤t empfohlen. 150 DPI ist fÃ¼r Bildschirmansicht ausreichend und erzeugt kleinere Dateien. 600 DPI fÃ¼r hÃ¶chste QualitÃ¤t, erzeugt aber groÃŸe Dateien.' },
      { question: 'Wird die DateigrÃ¶ÃŸe zunehmen?', answer: 'Die DateigrÃ¶ÃŸe hÃ¤ngt von DPI und Inhalt ab. 150 DPI erzeugt normalerweise kleinere Dateien, 300 DPI kann die GrÃ¶ÃŸe erhÃ¶hen, 600 DPI erhÃ¶ht die GrÃ¶ÃŸe erheblich. Kompression wird automatisch angewendet.' },
      { question: 'Ist dies umkehrbar?', answer: 'Nein, Schriftdaten werden dauerhaft entfernt. Bewahren Sie ein Backup des Originals auf, wenn Sie bearbeitbaren Text mit den Originalschriften benÃ¶tigen.' },
      { question: 'Was ist mit Vektorgrafiken?', answer: 'Vektorgrafiken (Formen, Linien) im Original-PDF werden zusammen mit Text in Raster konvertiert. Die visuelle QualitÃ¤t wird bei Ihrer gewÃ¤hlten DPI bewahrt.' },
    ],
  },

  'extract-tables': {
    title: 'Tabellen aus PDF extrahieren',
    metaDescription: 'Erkennen und extrahieren Sie Tabellen aus PDF-Dokumenten. Exportieren Sie in JSON-, Markdown- oder CSV-Formate.',
    description: `
      <p>Tabellen aus PDF extrahieren erkennt tabellarische Daten in Ihren PDF-Dokumenten und exportiert sie in strukturierten Formaten. WÃ¤hlen Sie JSON fÃ¼r Datenintegration, Markdown fÃ¼r Dokumentation oder CSV fÃ¼r Tabellenkalkulationen.</p>
      <p>Das Tool verwendet intelligente Erkennungsalgorithmen, um Tabellenstrukturen auch in komplexen Dokumenten zu identifizieren. Geben Sie Seitenbereiche an und passen Sie Erkennungsparameter fÃ¼r optimale Ergebnisse an.</p>
      <p>Die gesamte Verarbeitung erfolgt lokal in Ihrem Browser, sodass Ihre Dokumente privat bleiben.</p>
    `,
    howToUse: [
      { step: 1, title: 'PDF hochladen', description: 'Laden Sie das PDF mit Tabellen hoch, die Sie extrahieren mÃ¶chten.' },
      { step: 2, title: 'Erkennung konfigurieren', description: 'Legen Sie Seitenbereich und Mindest-Spalten-/Zeilenschwellenwerte fest.' },
      { step: 3, title: 'Exportieren und Herunterladen', description: 'WÃ¤hlen Sie Ausgabeformat (JSON/Markdown/CSV) und laden Sie herunter.' },
    ],
    useCases: [
      { title: 'Datenanalyse', description: 'Extrahieren Sie Tabellendaten zur Analyse in Tabellenkalkulationen oder Datenbanken.', icon: 'bar-chart' },
      { title: 'Berichtsverarbeitung', description: 'Ziehen Sie Tabellen aus PDF-Berichten zur weiteren Verarbeitung.', icon: 'file-text' },
      { title: 'Dokumentation', description: 'Konvertieren Sie PDF-Tabellen in Markdown fÃ¼r technische Dokumentation.', icon: 'book' },
    ],
    faq: [
      { question: 'KÃ¶nnen komplexe Tabellen erkannt werden?', answer: 'Das Tool funktioniert am besten mit einfachen Rastertabellen. Komplexe verbundene Zellen erfordern mÃ¶glicherweise manuelle Anpassung.' },
      { question: 'Was wenn keine Tabellen gefunden werden?', answer: 'Versuchen Sie, den Mindest-Spalten-/Zeilenschwellenwert anzupassen oder prÃ¼fen Sie, ob das PDF tatsÃ¤chliche Tabellenstrukturen enthÃ¤lt.' },
      { question: 'Kann ich von bestimmten Seiten extrahieren?', answer: 'Ja, geben Sie einen Seitenbereich an, um die Extraktion auf bestimmte Seiten zu beschrÃ¤nken.' },
    ],
  },

  'deskew-pdf': {
    title: 'PDF begradigen',
    metaDescription: 'Begradigen Sie automatisch gescannte oder geneigte PDF-Seiten. Korrigieren Sie schiefe Dokumente mit prÃ¤ziser Winkelerkennung.',
    description: `
      <p>PDF begradigen erkennt und korrigiert automatisch geneigte oder schiefe Seiten in Ihren PDF-Dokumenten mithilfe einer erweiterten Varianzanalyse des Projektionsprofils. Dies ist wichtig fÃ¼r gescannte Dokumente, die in einem Winkel in den Scanner eingelegt wurden.</p>
      <p>Das Tool analysiert die Text- und Inhaltsausrichtung in verschiedenen Winkeln, um die optimale Rotation zu finden, und wendet dann die Korrektur an. Sie kÃ¶nnen den Empfindlichkeitsschwellenwert (1-30) und die DPI-Einstellungen (72-300) fÃ¼r optimale Ergebnisse anpassen.</p>
      <p>Die gesamte Verarbeitung erfolgt lokal in Ihrem Browser mit WebAssembly-Technologie, sodass Ihre Dokumente privat und sicher bleiben.</p>
    `,
    howToUse: [
      { step: 1, title: 'PDF hochladen', description: 'Ziehen Sie Ihre gescannte PDF-Datei per Drag & Drop oder klicken Sie, um auszuwÃ¤hlen.' },
      { step: 2, title: 'Einstellungen konfigurieren', description: 'Passen Sie bei Bedarf den Empfindlichkeitsschwellenwert und DPI fÃ¼r eine bessere Erkennung an.' },
      { step: 3, title: 'Verarbeiten und Herunterladen', description: 'Klicken Sie auf Begradigen, um Seiten zu begradigen und das korrigierte PDF herunterzuladen.' },
    ],
    useCases: [
      { title: 'Gescannte Dokumente', description: 'Korrigieren Sie Seiten, die in einem Winkel von DokumenteneinzÃ¼gen gescannt wurden.', icon: 'scan' },
      { title: 'Mobile Scans', description: 'Korrigieren Sie geneigte Fotos von Dokumenten, die mit Smartphones aufgenommen wurden.', icon: 'smartphone' },
      { title: 'Archivwiederherstellung', description: 'Begradigen Sie alte gescannte Archive fÃ¼r bessere Lesbarkeit.', icon: 'archive' },
    ],
    faq: [
      { question: 'Wie genau ist die Winkelerkennung?', answer: 'Das Tool verwendet Varianzanalyse des Projektionsprofils, um SchrÃ¤glagenwinkel von bis zu Â±10 Grad mit hoher Genauigkeit zu erkennen. Es Ã¼berspringt automatisch Seiten mit Winkeln unter 0,3 Grad.' },
      { question: 'Wird die TextqualitÃ¤t beeintrÃ¤chtigt?', answer: 'Bei Rotationen in Vielfachen von 90 Grad tritt kein QualitÃ¤tsverlust auf. Bei anderen Winkeln rundet das Tool auf den nÃ¤chsten Grad und behÃ¤lt eine gute QualitÃ¤t bei.' },
      { question: 'Kann ich nur bestimmte Seiten begradigen?', answer: 'Das Tool analysiert alle Seiten, korrigiert aber nur solche mit erkannten SchrÃ¤glagen Ã¼ber dem Empfindlichkeitsschwellenwert. Seiten mit minimaler SchrÃ¤glage bleiben unverÃ¤ndert.' },
      { question: 'Was ist der Empfindlichkeitsschwellenwert?', answer: 'Werte 1-10 korrigieren nur offensichtliche Neigungen, 11-20 erkennen moderate SchrÃ¤glagen und 21-30 erfassen subtile Winkel. Der Standardwert ist 10 fÃ¼r ausgewogene Erkennung.' },
      { question: 'Wie lange dauert die Verarbeitung?', answer: 'Die Verarbeitungszeit hÃ¤ngt von der DateigrÃ¶ÃŸe und DPI ab. 150 DPI (Standard) bietet ein gutes Gleichgewicht zwischen Geschwindigkeit und Genauigkeit. HÃ¶here DPI ist genauer, aber langsamer.' },
    ],
  },

  'pdf-to-pdfa': {
    title: 'PDF zu PDF/A',
    metaDescription: 'Konvertieren Sie PDF in das PDF/A-Archivformat. GewÃ¤hrleisten Sie langfristige Dokumentenerhaltung mit ISO-Standards.',
    description: `
      <p>PDF zu PDF/A konvertiert Ihre PDF-Dokumente in das PDF/A-Format, den ISO-Standard fÃ¼r langfristige Dokumentenarchivierung. PDF/A stellt sicher, dass Dokumente jahrzehntelang sichtbar und reproduzierbar bleiben.</p>
      <p>WÃ¤hlen Sie zwischen PDF/A-1b (grundlegende KonformitÃ¤t), PDF/A-2b (empfohlen, unterstÃ¼tzt Transparenz) oder PDF/A-3b (ermÃ¶glicht eingebettete Dateien). Das Tool bettet Schriftarten ein und glÃ¤ttet Transparenz nach Bedarf.</p>
      <p>Die gesamte Konvertierung erfolgt lokal in Ihrem Browser, sodass Ihre Dokumente privat bleiben.</p>
    `,
    howToUse: [
      { step: 1, title: 'PDF hochladen', description: 'Laden Sie das PDF hoch, das Sie in PDF/A konvertieren mÃ¶chten.' },
      { step: 2, title: 'PDF/A-Level auswÃ¤hlen', description: 'WÃ¤hlen Sie das KonformitÃ¤tsniveau PDF/A-1b, PDF/A-2b oder PDF/A-3b.' },
      { step: 3, title: 'Konvertieren und Herunterladen', description: 'Konvertieren Sie in PDF/A und laden Sie das Archivdokument herunter.' },
    ],
    useCases: [
      { title: 'Rechtsarchive', description: 'Konvertieren Sie Rechtsdokumente in PDF/A fÃ¼r gerichtlich zulÃ¤ssige langfristige Speicherung.', icon: 'scale' },
      { title: 'Regierungsaufzeichnungen', description: 'ErfÃ¼llen Sie Regierungsarchivanforderungen mit PDF/A.', icon: 'building' },
      { title: 'GeschÃ¤ftsarchive', description: 'Bewahren Sie wichtige GeschÃ¤ftsdokumente fÃ¼r zukÃ¼nftige ZugÃ¤nglichkeit auf.', icon: 'archive' },
    ],
    faq: [
      { question: 'Welches PDF/A-Level soll ich verwenden?', answer: 'PDF/A-2b wird fÃ¼r die meisten Anwendungen empfohlen. Verwenden Sie 1b fÃ¼r maximale KompatibilitÃ¤t oder 3b, wenn Sie eingebettete Dateien benÃ¶tigen.' },
      { question: 'Was macht PDF/A anders?', answer: 'PDF/A bettet Schriftarten ein, deaktiviert VerschlÃ¼sselung und stellt sicher, dass alle Elemente fÃ¼r zukÃ¼nftige Betrachtung eigenstÃ¤ndig sind.' },
      { question: 'Kann ich von PDF/A zurÃ¼ckkonvertieren?', answer: 'PDF/A-Dateien sind Standard-PDFs und kÃ¶nnen normal geÃ¶ffnet werden. Die Archivfunktionen fÃ¼gen EinschrÃ¤nkungen hinzu, keine Limitierungen.' },
    ],
  },

  'digital-sign-pdf': {
    title: 'Digitale Signatur',
    metaDescription: 'FÃ¼gen Sie X.509 digitale Signaturen zu PDF-Dokumenten hinzu. Signieren Sie PDFs mit PFX-, P12- oder PEM-Zertifikaten fÃ¼r rechtliche GÃ¼ltigkeit.',
    description: '<p>Das Tool fÃ¼r digitale Signaturen ermÃ¶glicht es Ihnen, kryptografische X.509 digitale Signaturen zu PDF-Dokumenten hinzuzufÃ¼gen.</p>',
    howToUse: [
      { step: 1, title: 'PDF hochladen', description: 'Laden Sie das PDF-Dokument hoch, das Sie digital signieren mÃ¶chten.' },
      { step: 2, title: 'Zertifikat laden', description: 'Laden Sie Ihre X.509-Zertifikatsdatei (.pfx, .p12 oder .pem) hoch und geben Sie das Passwort ein.' },
      { step: 3, title: 'Signieren und Herunterladen', description: 'Klicken Sie auf PDF signieren, um die digitale Signatur anzuwenden und laden Sie das signierte Dokument herunter.' },
    ],
    useCases: [
      { title: 'Rechtsdokumente', description: 'Signieren Sie VertrÃ¤ge und Rechtsdokumente mit rechtlich bindenden digitalen Signaturen.', icon: 'scale' },
      { title: 'GeschÃ¤ftsgenehmigungen', description: 'Signieren Sie Rechnungen und Genehmigungsdokumente digital fÃ¼r PrÃ¼fpfade.', icon: 'briefcase' },
      { title: 'DokumentenintegritÃ¤t', description: 'Stellen Sie sicher, dass Dokumente nach der Signierung nicht verÃ¤ndert wurden.', icon: 'shield-check' },
    ],
    faq: [
      { question: 'Welche Zertifikatsformate werden unterstÃ¼tzt?', answer: 'PFX (.pfx), PKCS#12 (.p12) und PEM (.pem) Zertifikatsformate werden unterstÃ¼tzt.' },
      { question: 'Ist die Signatur rechtlich gÃ¼ltig?', answer: 'Ja, X.509 digitale Signaturen mit einem gÃ¼ltigen Zertifikat sind in den meisten Rechtsordnungen rechtlich anerkannt.' },
      { question: 'Kann ich eine sichtbare Signatur hinzufÃ¼gen?', answer: 'Ja, Sie kÃ¶nnen eine sichtbare Signatur mit benutzerdefiniertem Text, Bild, Position und Stil hinzufÃ¼gen.' },
    ],
  },

  'validate-signature': {
    title: 'Signatur Validieren',
    metaDescription: 'ÃœberprÃ¼fen Sie digitale Signaturen in PDF-Dokumenten. PrÃ¼fen Sie ZertifikatsgÃ¼ltigkeit, Unterzeichnerinformationen und DokumentenintegritÃ¤t.',
    description: '<p>Das Tool Signatur Validieren ermÃ¶glicht es Ihnen, digitale Signaturen in PDF-Dokumenten zu Ã¼berprÃ¼fen.</p>',
    howToUse: [
      { step: 1, title: 'Signiertes PDF hochladen', description: 'Laden Sie ein PDF-Dokument hoch, das digitale Signaturen enthÃ¤lt.' },
      { step: 2, title: 'Ergebnisse anzeigen', description: 'Sehen Sie alle im Dokument gefundenen Signaturen mit ihrem GÃ¼ltigkeitsstatus.' },
      { step: 3, title: 'Bericht exportieren', description: 'Laden Sie optional einen JSON-Bericht der Validierungsergebnisse herunter.' },
    ],
    useCases: [
      { title: 'Dokumentenverifizierung', description: 'ÃœberprÃ¼fen Sie, dass signierte Dokumente authentisch sind und nicht verÃ¤ndert wurden.', icon: 'shield-check' },
      { title: 'Compliance-Audit', description: 'PrÃ¼fen Sie die SignaturgÃ¼ltigkeit fÃ¼r Compliance- und Auditzwecke.', icon: 'clipboard-check' },
      { title: 'ZertifikatsÃ¼berprÃ¼fung', description: 'Sehen Sie Zertifikatsdetails und Ablaufdaten von signierten Dokumenten.', icon: 'award' },
    ],
    faq: [
      { question: 'Was bedeutet "gÃ¼ltig"?', answer: 'Eine gÃ¼ltige Signatur bedeutet, dass das Dokument seit der Signierung nicht geÃ¤ndert wurde und die Zertifikatskette intakt ist.' },
      { question: 'Kann ich mehrere PDFs validieren?', answer: 'Ja, Sie kÃ¶nnen mehrere PDFs hochladen und alle Signaturen im Stapel validieren.' },
      { question: 'Warum kÃ¶nnte eine Signatur ungÃ¼ltig sein?', answer: 'Signaturen kÃ¶nnen ungÃ¼ltig sein, wenn das Dokument geÃ¤ndert wurde, das Zertifikat abgelaufen ist oder das Zertifikat nicht vertrauenswÃ¼rdig ist.' },
    ],
  },
};
