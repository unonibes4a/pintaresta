 
      const GiovanniIconDB = {
  // --- CAD & Herramientas ---
  pencil:     '<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>',
  square:     '<path d="M3 3h18v18H3V3zm2 2v14h14V5H5z"/>',
  sphere:     '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>',
  sliders:    '<path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"/>',
  reset:      '<path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>',
  drop:       '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>',
  filter:     '<path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>',
  search:     '<path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>',
  layers:     '<path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27-7.38 5.74zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16z"/>',
  cube:       '<path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.12-.36.18-.57.18-.21 0-.41-.06-.57-.18l-7.9-4.44A.991.991 0 0 1 3 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.12.36-.18.57-.18.21 0 .41.06.57.18l7.9 4.44c.32.17.53.5.53.88v9zM12 4.15L6.04 7.5 12 10.85l5.96-3.35L12 4.15zM5 15.91l6 3.38v-6.71L5 9.19v6.72zm14 0v-6.72l-6 3.38v6.72l6-3.38z"/>',
  ruler:      '<path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-2 10H5V8h14v8zM7 10h2v4H7v-4zm4 0h2v4h-2v-4zm4 0h2v4h-2v-4z"/>',

  // --- UI Universal & Navegación ---
  home:         '<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>',
  menu:         '<path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/>',
  menuOpen:     '<path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/>',
  back:         '<path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>',
  forward:      '<path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>',
  up:           '<path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/>',
  down:         '<path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"/>',
  chevronDown:  '<path d="M7 10l5 5 5-5z"/>',
  chevronLeft:  '<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>',
  chevronRight: '<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>',
  expandMore:   '<path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/>',
  expandLess:   '<path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/>',

  // --- Acciones & Edición ---
  check:  '<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>',
  close:  '<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>',
  delete: '<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>',
  trash:  '<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>',
  edit:   '<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>',
  copy:   '<path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>',
  save:   '<path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>',
  print:  '<path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/>',
  undo:   '<path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"/>',
  redo:   '<path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z"/>',

  // --- Formularios & Contacto ---
  mail:     '<path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>',
  email:    '<path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>',
  phone:    '<path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>',
  password: '<path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>',
  lock:     '<path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>',
  unlock:   '<path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z"/>',
  user:     '<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>',
  users:    '<path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>',
  send:     '<path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>',
  attach:   '<path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/>',

  // --- Extras / Media ---
  settings: '<path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.06-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.73,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.06,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.49-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>',
  image:    '<path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>',
  file:     '<path d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z"/>',
  folder:   '<path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>',
      // --- Edición de Video ---
    play: '<path d="M8 5v14l11-7z"/>',
    pause: '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>',
    stop: '<path d="M6 6h12v12H6z"/>',
    record: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z"/>',
    skipNext: '<path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>',
    skipPrev: '<path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>',
    fastForward: '<path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/>',
    rewind: '<path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/>',
    fullscreen: '<path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>',
    fullscreenExit: '<path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>',
    volumeUp: '<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>',
    volumeDown: '<path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/>',
    volumeMute: '<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>',
    videoCamera: '<path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>',
    scissors: '<path d="M9.64 7.64c.23-.5.36-1.05.36-1.64 0-2.21-1.79-4-4-4S2 3.79 2 6s1.79 4 4 4c.59 0 1.14-.13 1.64-.36L10 12l-2.36 2.36C7.14 14.13 6.59 14 6 14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4c0-.59-.13-1.14-.36-1.64L12 14l7 7h3v-1L9.64 7.64zM6 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm0 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6-7.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM19 3l-6 6 2 2 7-7V3z"/>',

    // --- Audio y Música ---
    musicNote: '<path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>',
    mic: '<path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>',
    micOff: '<path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.18l5.98 5.99zM4.27 3L3 4.27l6.01 6.01V11c0 1.66 1.33 3 2.99 3 .22 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52-2.76 0-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c.91-.13 1.77-.45 2.54-.9L19.73 21 21 19.73 4.27 3z"/>',
    headphones: '<path d="M12 3a9 9 0 0 0-9 9v7c0 1.1.9 2 2 2h4v-8H5v-1c0-3.87 3.13-7 7-7s7 3.13 7 7v1h-4v8h4c1.1 0 2-.9 2-2v-7a9 9 0 0 0-9-9z"/>',
    equalizer: '<path d="M10 20h4V4h-4v16zm-6 0h4v-8H4v8zM16 9v11h4V9h-4z"/>',
    playlist: '<path d="M4 10h12v2H4zm0-4h12v2H4zm0 8h8v2H4zm10 0v6l5-3z"/>',
    radio: '<path d="M3.24 6.15C2.51 6.43 2 7.17 2 8v12c0 1.1.89 2 2 2h16c1.11 0 2-.9 2-2V8c0-1.11-.89-2-2-2H8.3l8.26-3.34L15.88 1 3.24 6.15zM7 20c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm13-8h-2v-2h-2v2H4V8h16v4z"/>',

    // --- Editar Brochas y Pintura ---
    brush: '<path d="M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3zm13.71-9.37l-1.34-1.34a.996.996 0 0 0-1.41 0L9 12.25 11.75 15l8.96-8.96a.996.996 0 0 0 0-1.41z"/>',
    formatPaint: '<path d="M18 4V3c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V6h1v4H9v11c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-9h8V4h-3z"/>',
    colorLens: '<path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>',
    palette: '<path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>',
    fill: '<path d="M16.56 8.94L7.62 0 6.21 1.41l2.38 2.38-5.15 5.15c-.59.59-.59 1.54 0 2.12l5.5 5.5c.29.29.68.44 1.06.44s.77-.15 1.06-.44l5.5-5.5c.59-.58.59-1.53 0-2.12zM5.21 10L10 5.21 14.79 10H5.21zM19 11.5s-2 2.17-2 3.5c0 1.1.9 2 2 2s2-.9 2-2c0-1.33-2-3.5-2-3.5z"/>',
    crop: '<path d="M17 15h2V7c0-1.1-.9-2-2-2H9v2h8v8zM7 17V1H5v4H1v2h4v10c0 1.1.9 2 2 2h10v4h2v-4h4v-2H7z"/>',
    formatColorFill: '<path d="M16.56 8.94L7.62 0 6.21 1.41l2.38 2.38-5.15 5.15c-.59.59-.59 1.54 0 2.12l5.5 5.5c.29.29.68.44 1.06.44s.77-.15 1.06-.44l5.5-5.5c.59-.58.59-1.53 0-2.12zM5.21 10L10 5.21 14.79 10H5.21zM19 11.5s-2 2.17-2 3.5c0 1.1.9 2 2 2s2-.9 2-2c0-1.33-2-3.5-2-3.5z"/>',
    eraser: '<path d="M16.24 3.56l4.95 4.94c.78.79.78 2.05 0 2.84L12 20.53a4.008 4.008 0 0 1-5.66 0L2.81 17c-.78-.79-.78-2.05 0-2.84l10.6-10.6c.79-.78 2.05-.78 2.83 0M4.22 15.58l3.54 3.53c.78.79 2.04.79 2.83 0l3.53-3.53-4.95-4.95-4.95 4.95z"/>'

  
};

class GiovanniColorPicker {
    constructor(options = {}) {
        this.id = options.id || 'vcp_' + Math.random().toString(36).substring(2, 9);
        this.title = options.title || 'Selector HSV / RGB';
        this.onChange = options.onChange || (() => {});
        this.onEyedropper = options.onEyedropper || (() => {});

       
        this.isTriangle = options.isTriangle ?? false;

        this.hueWidth = options.hueWidth || 34;
        this.canvasHeight = options.canvasHeight || 190;
        this.isEyedropperActive = false;

 
        const init = options.initialColor || { r: 0.4, g: 1.0, b: 0.4, a: 1.0 };
        this.r = init.r > 1 ? init.r / 255 : (init.r ?? 1.0);
        this.g = init.g > 1 ? init.g / 255 : (init.g ?? 1.0);
        this.b = init.b > 1 ? init.b / 255 : (init.b ?? 0.0);
        this.a = init.a ?? 1.0;

        const hsv = this.rgbToHsv(this.r, this.g, this.b);
        this.h = hsv.h;
        this.s = hsv.s;
        this.v = hsv.v;

        this.hex = this.rgbToHex(this.r, this.g, this.b);

        this.injectStyles();
        this.buildDOM();
        this.initCanvasEvents();

        this.panel = { element: this.container, title: this.title };
        this.element = this.container;

        this.updateModeVisibility();
        this.updateUI();
    }

    mount(target) {
        const dest = target?.element || target;
        if (dest && dest.appendChild) {
            dest.appendChild(this.container);
        }
        return this;
    }

    injectStyles() {
        if (document.getElementById('vanilla-color-picker-core-css')) return;

        const style = document.createElement('style');
        style.id = 'vanilla-color-picker-core-css';
        style.textContent = `
            .vcp-root {
                background: #19191c;
                border: 1px solid #2d2d33;
                border-radius: 6px;
                padding: 10px;
                color: #8c8c8c;
                font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
                font-size: 11px;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                gap: 8px;
                user-select: none;
                width: 100%;
                max-width: 320px;
            }
            .vcp-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 6px;
            }
            .vcp-title {
                font-weight: 700;
                color: #7a7a85;
                font-size: 10px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                flex: 1;
            }
            .vcp-header-actions {
                display: flex;
                align-items: center;
                gap: 5px;
            }
            .vcp-btn-tool {
                display: flex;
                align-items: center;
                justify-content: center;
                background: #292929;
                color: #8c8c8c;
                border: 1px solid #383838;
                border-radius: 4px;
                padding: 3px 6px;
                font-family: inherit;
                font-size: 10px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.2s;
            }
            .vcp-btn-tool:hover {
                background: #333333;
                color: #ffffff;
                border-color: #555555;
            }
            .vcp-btn-tool.active {
                background: #0c4a6e !important;
                color: #38bdf8 !important;
                border-color: #38bdf8 !important;
                box-shadow: 0 0 6px rgba(56, 189, 248, 0.4);
            }
            .vcp-canvas-area {
                display: flex;
                gap: 8px;
                margin-top: 2px;
            }
            .vcp-sv-canvas {
                flex: 1 1 0;
                min-width: 0;
                border-radius: 4px;
                cursor: crosshair;
                border: 1px solid #333;
                display: block;
            }
            .vcp-hue-canvas {
                border-radius: 4px;
                cursor: pointer;
                border: 1px solid #333;
                display: block;
                flex-shrink: 0;
            }
            .vcp-triangle-canvas {
                width: 100%;
                border-radius: 4px;
                border: 1px solid #333;
                cursor: crosshair;
                display: block;
                background: #141416;
            }
            .vcp-preview-wrapper {
                width: 40px;
                height: 20px;
                border-radius: 4px;
                border: 1px solid #3e3e46;
                position: relative;
                overflow: hidden;
                cursor: pointer;
                background-image: 
                    linear-gradient(45deg, #252529 25%, transparent 25%), 
                    linear-gradient(-45deg, #252529 25%, transparent 25%), 
                    linear-gradient(45deg, transparent 75%, #252529 75%), 
                    linear-gradient(-45deg, transparent 75%, #252529 75%);
                background-size: 8px 8px;
                background-position: 0 0, 0 4px, 4px -4px, -4px 0px;
            }
            .vcp-preview-color {
                width: 100%;
                height: 100%;
            }
            .vcp-row {
                display: flex;
                align-items: center;
                gap: 6px;
            }
            .vcp-input {
                background: #292929 !important;
                color: #676767 !important;
                border: 1px solid #383838;
                border-radius: 4px;
                padding: 4px 6px;
                font-family: inherit;
                font-size: 11px;
                outline: none;
                box-sizing: border-box;
                transition: border-color 0.2s, color 0.2s;
            }
            .vcp-input:focus {
                border-color: #555555;
                color: #b5b5b5 !important;
            }
            .vcp-grid-rgba {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 6px;
            }
            .vcp-grid-cell {
                display: flex;
                align-items: center;
                gap: 4px;
            }
            .vcp-grid-cell .vcp-label {
                width: 12px;
                color: #676767;
                font-size: 10px;
                font-weight: bold;
            }
            .vcp-grid-cell input[type="number"] {
                width: 100%;
                -moz-appearance: textfield;
            }
            .vcp-grid-cell input[type="number"]::-webkit-outer-spin-button,
            .vcp-grid-cell input[type="number"]::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
            .vcp-stats-box {
                background: #1e1e22;
                border: 1px dashed #34343d;
                border-radius: 4px;
                padding: 6px 8px;
                display: flex;
                justify-content: space-between;
                font-size: 10px;
                color: #676767;
            }
            .vcp-stats-val { color: #a0a0aa; font-weight: bold; }
            .vcp-stats-ratio { color: #4daafc; font-weight: bold; }
        `;
        document.head.appendChild(style);
    }

    buildDOM() {
        this.container = document.createElement('div');
        this.container.id = this.id;
        this.container.className = 'vcp-root';

        // 1. Cabecera
        const header = document.createElement('div');
        header.className = 'vcp-header';

        const title = document.createElement('span');
        title.className = 'vcp-title';
        title.textContent = this.title;
        header.appendChild(title);

        const actions = document.createElement('div');
        actions.className = 'vcp-header-actions';

        this.btnToggleMode = document.createElement('button');
        this.btnToggleMode.type = 'button';
        this.btnToggleMode.className = 'vcp-btn-tool';
        this.btnToggleMode.title = 'Cambiar forma (Rectangular / Triangular)';
        this.btnToggleMode.textContent = this.isTriangle ? '▤ REC' : '◬ TRI';
        this.btnToggleMode.onclick = () => this.setMode(!this.isTriangle);
        actions.appendChild(this.btnToggleMode);

        this.btnEyedropper = document.createElement('button');
        this.btnEyedropper.type = 'button';
        this.btnEyedropper.className = 'vcp-btn-tool';
        this.btnEyedropper.title = 'Cuentagotas (Eyedropper)';
        this.btnEyedropper.innerHTML = `
            <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                <path d="M20.71 5.63l-2.34-2.34a1 1 0 0 0-1.41 0l-3.12 3.12-1.93-1.91-1.41 1.42 1.42 1.42L3 16.25V21h4.75l8.92-8.92 1.42 1.42 1.41-1.41-1.92-1.92 3.13-3.13a1 1 0 0 0 0-1.41zM6.92 19L5 17.08l8.06-8.06 1.92 1.92L6.92 19z"/>
            </svg>
            <span style="margin-left:3px;">EYE</span>
        `;
        this.btnEyedropper.onclick = () => {
            this.isEyedropperActive = !this.isEyedropperActive;
            this.btnEyedropper.classList.toggle('active', this.isEyedropperActive);
            this.onEyedropper(this.isEyedropperActive);
        };
        actions.appendChild(this.btnEyedropper);

        this.previewWrapper = document.createElement('div');
        this.previewWrapper.className = 'vcp-preview-wrapper';
        this.previewColor = document.createElement('div');
        this.previewColor.className = 'vcp-preview-color';
        this.previewColor.style.background = this.getRGBAString();
        this.previewWrapper.appendChild(this.previewColor);
        actions.appendChild(this.previewWrapper);

        header.appendChild(actions);
        this.container.appendChild(header);

        // 2.A: Área Rectangular
        this.rectArea = document.createElement('div');
        this.rectArea.className = 'vcp-canvas-area';
        this.rectArea.style.height = this.canvasHeight + 'px';

        this.svCanvas = document.createElement('canvas');
        this.svCanvas.className = 'vcp-sv-canvas';
        this.svCanvas.width = 240;
        this.svCanvas.height = this.canvasHeight;
        this.svCanvas.style.flex = '1 1 0';
        this.svCanvas.style.minWidth = '0';
        this.svCtx = this.svCanvas.getContext('2d');

        this.hueCanvas = document.createElement('canvas');
        this.hueCanvas.className = 'vcp-hue-canvas';
        this.hueCanvas.width = this.hueWidth;
        this.hueCanvas.height = this.canvasHeight;
        this.hueCanvas.style.width = this.hueWidth + 'px';
        this.hueCanvas.style.minWidth = this.hueWidth + 'px';
        this.hueCanvas.style.maxWidth = this.hueWidth + 'px';
        this.hueCanvas.style.flex = '0 0 ' + this.hueWidth + 'px';
        this.hueCtx = this.hueCanvas.getContext('2d');

        this.rectArea.appendChild(this.svCanvas);
        this.rectArea.appendChild(this.hueCanvas);
        this.container.appendChild(this.rectArea);

        // 2.B: Área Triangular
        this.triangleArea = document.createElement('div');
        this.triangleArea.style.width = '100%';
        this.triangleArea.style.height = this.canvasHeight + 'px';

        this.triangleCanvas = document.createElement('canvas');
        this.triangleCanvas.className = 'vcp-triangle-canvas';
        this.triangleCanvas.width = 280;
        this.triangleCanvas.height = this.canvasHeight;
        this.triangleCtx = this.triangleCanvas.getContext('2d');

        this.triangleArea.appendChild(this.triangleCanvas);
        this.container.appendChild(this.triangleArea);

        // 3. Fila HEX y OBJETO RGBA
        const hexRow = document.createElement('div');
        hexRow.className = 'vcp-row';

        this.inputHex = document.createElement('input');
        this.inputHex.type = 'text';
        this.inputHex.className = 'vcp-input';
        this.inputHex.style.width = '75px';
        this.inputHex.maxLength = 7;
        this.inputHex.value = this.hex.toUpperCase();

        this.inputRgbaObj = document.createElement('input');
        this.inputRgbaObj.type = 'text';
        this.inputRgbaObj.className = 'vcp-input';
        this.inputRgbaObj.style.flex = '1';
        this.inputRgbaObj.style.minWidth = '0';
        this.inputRgbaObj.value = this.getRGBAObjectString();

        hexRow.appendChild(this.inputHex);
        hexRow.appendChild(this.inputRgbaObj);
        this.container.appendChild(hexRow);

        // 4. Inputs numéricos R, G, B, A (SIN RESTRICCIÓN DE ESCRITURA)
        const rgbaGrid = document.createElement('div');
        rgbaGrid.className = 'vcp-grid-rgba';

        this.inputs = {};
        ['r', 'g', 'b', 'a'].forEach(ch => {
            const cell = document.createElement('div');
            cell.className = 'vcp-grid-cell';

            const lbl = document.createElement('span');
            lbl.className = 'vcp-label';
            lbl.textContent = ch.toUpperCase();

            const num = document.createElement('input');
            num.type = 'number';
            num.className = 'vcp-input';
            num.step = 'any'; // <-- PERMITE CUALQUIER VALOR O DECIMAL LIBREMENTE
            num.value = this[ch].toFixed(3);

            cell.appendChild(lbl);
            cell.appendChild(num);
            rgbaGrid.appendChild(cell);
            this.inputs[ch] = num;

            // Manejador que no interrumpe mientras escribes
            num.addEventListener('input', () => {
                const raw = num.value.trim();
                // Si el usuario acaba de teclear "0." o está borrando, no forzar nada
                if (raw === '' || raw === '.' || raw === '-.' || raw.endsWith('.')) return;

                let val = parseFloat(raw);
                if (isNaN(val)) return;

                // Si escribe formato 0-255 (ej: 128 o 255), lo normaliza automáticamente
                if (val > 1 && ch !== 'a') {
                    val = val / 255;
                }
                val = Math.max(0, Math.min(1, val));
                this[ch] = val;

                if (ch !== 'a') {
                    const hsv = this.rgbToHsv(this.r, this.g, this.b);
                    this.h = hsv.h;
                    this.s = hsv.s;
                    this.v = hsv.v;
                    this.hex = this.rgbToHex(this.r, this.g, this.b);
                }

                // Actualiza canvas y otros inputs SIN sobreescribir este que estás tecleando
                this.updateUI(ch);
                this.emit();
            });

            // Al salir del input, redondea de forma limpia a 3 decimales
            num.addEventListener('blur', () => {
                num.value = parseFloat(this[ch].toFixed(3));
            });
        });

        this.container.appendChild(rgbaGrid);

        // 5. Estadísticas
        this.statsBox = document.createElement('div');
        this.statsBox.className = 'vcp-stats-box';
        this.lblMin = document.createElement('div');
        this.lblMax = document.createElement('div');
        this.lblRatio = document.createElement('div');
        this.statsBox.appendChild(this.lblMin);
        this.statsBox.appendChild(this.lblMax);
        this.statsBox.appendChild(this.lblRatio);
        this.container.appendChild(this.statsBox);

        // Eventos de inputs de texto
        this.inputHex.addEventListener('change', (e) => {
            let val = e.target.value.trim();
            if (!val.startsWith('#')) val = '#' + val;
            if (/^#[0-9A-F]{6}$/i.test(val)) {
                this.setHex(val);
            } else {
                this.inputHex.value = this.hex.toUpperCase();
            }
        });

        this.inputRgbaObj.addEventListener('change', (e) => {
            const str = e.target.value;
            const rMatch = str.match(/r\s*:\s*([\d.]+)/i);
            const gMatch = str.match(/g\s*:\s*([\d.]+)/i);
            const bMatch = str.match(/b\s*:\s*([\d.]+)/i);
            const aMatch = str.match(/a\s*:\s*([\d.]+)/i);

            if (rMatch && gMatch && bMatch) {
                this.setRGBA({
                    r: parseFloat(rMatch[1]),
                    g: parseFloat(gMatch[1]),
                    b: parseFloat(bMatch[1]),
                    a: aMatch ? parseFloat(aMatch[1]) : this.a
                });
            } else {
                this.inputRgbaObj.value = this.getRGBAObjectString();
            }
        });
    }

    setMode(isTriangle) {
        this.isTriangle = !!isTriangle;
        this.btnToggleMode.textContent = this.isTriangle ? '▤ REC' : '◬ TRI';
        this.updateModeVisibility();
        this.updateUI();
    }

    updateModeVisibility() {
        if (this.isTriangle) {
            this.rectArea.style.display = 'none';
            this.triangleArea.style.display = 'block';
        } else {
            this.rectArea.style.display = 'flex';
            this.triangleArea.style.display = 'none';
        }
    }

    setEyedropperActive(active) {
        this.isEyedropperActive = !!active;
        if (this.btnEyedropper) {
            this.btnEyedropper.classList.toggle('active', this.isEyedropperActive);
        }
    }

    drawTriangleCanvas() {
        const w = this.triangleCanvas.width;
        const h = this.triangleCanvas.height;
        const ctx = this.triangleCtx;
        ctx.clearRect(0, 0, w, h);

        const cx = w / 2;
        const cy = h / 2;
        const outerR = Math.min(cx, cy) - 6;
        const innerR = outerR - 16;

        ctx.save();
        const conic = ctx.createConicGradient(0, cx, cy);
        conic.addColorStop(0.00, '#ff0000');
        conic.addColorStop(0.17, '#ffff00');
        conic.addColorStop(0.33, '#00ff00');
        conic.addColorStop(0.50, '#00ffff');
        conic.addColorStop(0.67, '#0000ff');
        conic.addColorStop(0.83, '#ff00ff');
        conic.addColorStop(1.00, '#ff0000');

        ctx.beginPath();
        ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
        ctx.arc(cx, cy, innerR, 0, Math.PI * 2, true);
        ctx.fillStyle = conic;
        ctx.fill();
        ctx.restore();

        const radHue = (this.h * Math.PI) / 180;
        const hx1 = cx + innerR * Math.cos(radHue);
        const hy1 = cy + innerR * Math.sin(radHue);
        const hx2 = cx + outerR * Math.cos(radHue);
        const hy2 = cy + outerR * Math.sin(radHue);

        ctx.beginPath();
        ctx.moveTo(hx1, hy1);
        ctx.lineTo(hx2, hy2);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.stroke();

        const rTri = innerR - 5;
        const ptBlack = { x: cx, y: cy - rTri };
        const ptWhite = { x: cx - rTri * Math.cos(Math.PI / 6), y: cy + rTri * Math.sin(Math.PI / 6) };
        const ptColor = { x: cx + rTri * Math.cos(Math.PI / 6), y: cy + rTri * Math.sin(Math.PI / 6) };

        this.triPoints = { ptBlack, ptWhite, ptColor, rTri, cx, cy };

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(ptBlack.x, ptBlack.y);
        ctx.lineTo(ptWhite.x, ptWhite.y);
        ctx.lineTo(ptColor.x, ptColor.y);
        ctx.closePath();
        ctx.clip();

        const pureRGB = this.hsvToRgb(this.h, 1, 1);
        const pureHex = this.rgbToHex(pureRGB.r, pureRGB.g, pureRGB.b);
        const gradBase = ctx.createLinearGradient(ptWhite.x, ptWhite.y, ptColor.x, ptColor.y);
        gradBase.addColorStop(0, '#ffffff');
        gradBase.addColorStop(1, pureHex);
        ctx.fillStyle = gradBase;
        ctx.fillRect(0, 0, w, h);

        const gradBlack = ctx.createLinearGradient(ptBlack.x, ptBlack.y, ptBlack.x, ptWhite.y);
        gradBlack.addColorStop(0, '#000000');
        gradBlack.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gradBlack;
        ctx.fillRect(0, 0, w, h);
        ctx.restore();

        ctx.beginPath();
        ctx.moveTo(ptBlack.x, ptBlack.y);
        ctx.lineTo(ptWhite.x, ptWhite.y);
        ctx.lineTo(ptColor.x, ptColor.y);
        ctx.closePath();
        ctx.strokeStyle = '#383838';
        ctx.lineWidth = 1;
        ctx.stroke();

        const targetY = ptBlack.y + this.v * (ptWhite.y - ptBlack.y);
        const halfWidthAtY = this.v * (rTri * Math.cos(Math.PI / 6));
        const leftX = cx - halfWidthAtY;
        const rightX = cx + halfWidthAtY;
        const targetX = leftX + this.s * (rightX - leftX);

        ctx.beginPath();
        ctx.arc(targetX, targetY, 5, 0, Math.PI * 2);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(targetX, targetY, 4, 0, Math.PI * 2);
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    drawSVCanvas() {
        const w = this.svCanvas.width;
        const h = this.svCanvas.height;
        const ctx = this.svCtx;

        const pureColor = this.hsvToRgb(this.h, 1, 1);
        const hexHue = this.rgbToHex(pureColor.r, pureColor.g, pureColor.b);

        ctx.fillStyle = hexHue;
        ctx.fillRect(0, 0, w, h);

        const gradWhite = ctx.createLinearGradient(0, 0, w, 0);
        gradWhite.addColorStop(0, '#ffffff');
        gradWhite.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = gradWhite;
        ctx.fillRect(0, 0, w, h);

        const gradBlack = ctx.createLinearGradient(0, 0, 0, h);
        gradBlack.addColorStop(0, 'rgba(0,0,0,0)');
        gradBlack.addColorStop(1, '#000000');
        ctx.fillStyle = gradBlack;
        ctx.fillRect(0, 0, w, h);

        const cx = this.s * w;
        const cy = (1 - this.v) * h;

        ctx.beginPath();
        ctx.arc(cx, cy, 5, 0, Math.PI * 2);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx, cy, 4, 0, Math.PI * 2);
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    drawHueCanvas() {
        const w = this.hueCanvas.width;
        const h = this.hueCanvas.height;
        const ctx = this.hueCtx;

        const grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0.00, '#ff0000');
        grad.addColorStop(0.17, '#ff00ff');
        grad.addColorStop(0.33, '#0000ff');
        grad.addColorStop(0.50, '#00ffff');
        grad.addColorStop(0.67, '#00ff00');
        grad.addColorStop(0.83, '#ffff00');
        grad.addColorStop(1.00, '#ff0000');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        const barY = ((360 - this.h) / 360) * h;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, barY - 2, w, 4);
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.strokeRect(0, barY - 2, w, 4);
    }

    initCanvasEvents() {
        let isDraggingSV = false;
        const handleSV = (e) => {
            const rect = this.svCanvas.getBoundingClientRect();
            const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
            const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));

            this.s = x / rect.width;
            this.v = 1 - (y / rect.height);

            const rgb = this.hsvToRgb(this.h, this.s, this.v);
            this.r = rgb.r;
            this.g = rgb.g;
            this.b = rgb.b;
            this.hex = this.rgbToHex(this.r, this.g, this.b);

            this.updateUI();
            this.emit();
        };

        this.svCanvas.addEventListener('pointerdown', (e) => {
            isDraggingSV = true;
            this.svCanvas.setPointerCapture(e.pointerId);
            handleSV(e);
        });
        this.svCanvas.addEventListener('pointermove', (e) => { if (isDraggingSV) handleSV(e); });
        this.svCanvas.addEventListener('pointerup', () => { isDraggingSV = false; });

        let isDraggingHue = false;
        const handleHue = (e) => {
            const rect = this.hueCanvas.getBoundingClientRect();
            const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));

            this.h = (1 - (y / rect.height)) * 360;
            if (this.h >= 360) this.h = 0;

            const rgb = this.hsvToRgb(this.h, this.s, this.v);
            this.r = rgb.r;
            this.g = rgb.g;
            this.b = rgb.b;
            this.hex = this.rgbToHex(this.r, this.g, this.b);

            this.updateUI();
            this.emit();
        };

        this.hueCanvas.addEventListener('pointerdown', (e) => {
            isDraggingHue = true;
            this.hueCanvas.setPointerCapture(e.pointerId);
            handleHue(e);
        });
        this.hueCanvas.addEventListener('pointermove', (e) => { if (isDraggingHue) handleHue(e); });
        this.hueCanvas.addEventListener('pointerup', () => { isDraggingHue = false; });

        let triMode = null;
        const handleTriangleCanvas = (e) => {
            const rect = this.triangleCanvas.getBoundingClientRect();
            const scaleX = this.triangleCanvas.width / rect.width;
            const scaleY = this.triangleCanvas.height / rect.height;
            const x = (e.clientX - rect.left) * scaleX;
            const y = (e.clientY - rect.top) * scaleY;

            const cx = this.triangleCanvas.width / 2;
            const cy = this.triangleCanvas.height / 2;
            const outerR = Math.min(cx, cy) - 6;
            const innerR = outerR - 16;
            const dist = Math.hypot(x - cx, y - cy);

            if (triMode === 'ring' || (!triMode && dist >= innerR - 6)) {
                triMode = 'ring';
                let deg = (Math.atan2(y - cy, x - cx) * 180) / Math.PI;
                if (deg < 0) deg += 360;
                this.h = deg;
            } else {
                triMode = 'triangle';
                const { ptBlack, ptWhite, rTri } = this.triPoints;
                const clampedY = Math.max(ptBlack.y, Math.min(ptWhite.y, y));
                this.v = (clampedY - ptBlack.y) / (ptWhite.y - ptBlack.y);

                if (this.v <= 0.001) {
                    this.s = 0;
                    this.v = 0;
                } else {
                    const halfW = this.v * (rTri * Math.cos(Math.PI / 6));
                    const lx = cx - halfW;
                    const rx = cx + halfW;
                    const clampedX = Math.max(lx, Math.min(rx, x));
                    this.s = halfW > 0 ? (clampedX - lx) / (2 * halfW) : 0;
                }
            }

            const rgb = this.hsvToRgb(this.h, this.s, this.v);
            this.r = rgb.r;
            this.g = rgb.g;
            this.b = rgb.b;
            this.hex = this.rgbToHex(this.r, this.g, this.b);

            this.updateUI();
            this.emit();
        };

        this.triangleCanvas.addEventListener('pointerdown', (e) => {
            triMode = null;
            this.triangleCanvas.setPointerCapture(e.pointerId);
            handleTriangleCanvas(e);
        });
        this.triangleCanvas.addEventListener('pointermove', (e) => {
            if (e.buttons === 1) handleTriangleCanvas(e);
        });
        this.triangleCanvas.addEventListener('pointerup', () => { triMode = null; });
    }

    getRGBAObjectString() {
        const fmt = (n) => parseFloat(n.toFixed(3));
        return `rgba={r:${fmt(this.r)},g:${fmt(this.g)},b:${fmt(this.b)},a:${fmt(this.a)}}`;
    }

    getRGBAString() {
        return `rgba(${Math.round(this.r * 255)}, ${Math.round(this.g * 255)}, ${Math.round(this.b * 255)}, ${this.a})`;
    }

    updateStats() {
        let min = Math.min(this.r, this.g, this.b);
        let max = Math.max(this.r, this.g, this.b);
        let ratio = max > 0 ? (min / max) : 0;

        this.lblMin.innerHTML = `Mín: <span class="vcp-stats-val">${min.toFixed(2)}</span>`;
        this.lblMax.innerHTML = `Máx: <span class="vcp-stats-val">${max.toFixed(2)}</span>`;
        this.lblRatio.innerHTML = `Mín/Máx: <span class="vcp-stats-ratio">${ratio.toFixed(3)}</span>`;
    }

    /**
     * Actualiza la interfaz. Si se le pasa `skipChannel`, no toca ese input
     * para no interrumpir lo que el usuario está escribiendo.
     */
    updateUI(skipChannel = null) {
        this.previewColor.style.background = this.getRGBAString();

        ['r', 'g', 'b', 'a'].forEach(ch => {
            // No sobreescribir el campo que el usuario tiene enfocado/activo
            if (ch !== skipChannel && document.activeElement !== this.inputs[ch]) {
                this.inputs[ch].value = parseFloat(this[ch].toFixed(3));
            }
        });

        if (document.activeElement !== this.inputHex) {
            this.inputHex.value = this.hex.toUpperCase();
        }

        if (document.activeElement !== this.inputRgbaObj) {
            this.inputRgbaObj.value = this.getRGBAObjectString();
        }

        if (this.isTriangle) {
            this.drawTriangleCanvas();
        } else {
            this.drawSVCanvas();
            this.drawHueCanvas();
        }
        this.updateStats();
    }

    setHex(hexStr) {
        if (!hexStr) return;
        let hex = hexStr.trim();
        if (!hex.startsWith('#')) hex = '#' + hex;

        const rgb = this.hexToRgb(hex);
        this.r = rgb.r / 255;
        this.g = rgb.g / 255;
        this.b = rgb.b / 255;
        this.hex = hex.toLowerCase();

        const hsv = this.rgbToHsv(this.r, this.g, this.b);
        this.h = hsv.h;
        this.s = hsv.s;
        this.v = hsv.v;

        this.updateUI();
        this.emit();
    }

    setRGBA(rgba) {
        if (!rgba) return;
        this.r = rgba.r !== undefined ? (rgba.r > 1 ? rgba.r / 255 : rgba.r) : this.r;
        this.g = rgba.g !== undefined ? (rgba.g > 1 ? rgba.g / 255 : rgba.g) : this.g;
        this.b = rgba.b !== undefined ? (rgba.b > 1 ? rgba.b / 255 : rgba.b) : this.b;
        this.a = rgba.a !== undefined ? rgba.a : this.a;

        this.hex = this.rgbToHex(this.r, this.g, this.b);
        const hsv = this.rgbToHsv(this.r, this.g, this.b);
        this.h = hsv.h;
        this.s = hsv.s;
        this.v = hsv.v;

        this.updateUI();
        this.emit();
    }

    emit() {
        const rgbaNormalized = {
            r: parseFloat(this.r.toFixed(3)),
            g: parseFloat(this.g.toFixed(3)),
            b: parseFloat(this.b.toFixed(3)),
            a: parseFloat(this.a.toFixed(3))
        };
        const rgba255 = {
            r: Math.round(this.r * 255),
            g: Math.round(this.g * 255),
            b: Math.round(this.b * 255),
            a: this.a
        };
        this.onChange(rgbaNormalized, rgba255, this.hex, this.a);
    }

    hsvToRgb(h, s, v) {
        let f = (n, k = (n + h / 60) % 6) => v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
        return { r: f(5), g: f(3), b: f(1) };
    }

    rgbToHsv(r, g, b) {
        let max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
        let h = 0, s = max === 0 ? 0 : d / max, v = max;
        if (max !== min) {
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h *= 60;
        }
        return { h, s, v };
    }

    rgbToHex(r, g, b) {
        const toHex = (n) => Math.max(0, Math.min(255, Math.round(n * 255))).toString(16).padStart(2, '0');
        return '#' + toHex(r) + toHex(g) + toHex(b);
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 255, g: 255, b: 255 };
    }
}




   
   function agregarClaseAElementos(nombreClase) {
  const elementos = document.querySelectorAll('aside, main, div, footer');
  
  elementos.forEach(el => {
 
    if (el.closest('.gio-acc-item') || el.id.startsWith('gio-snap-')) {
      return;
    }
    el.classList.add(nombreClase);
  });
}

          setTimeout(() => {
     agregarClaseAElementos("app-workspace");
        },2000); 
   
   class GiovanniToggleAcordion {
  static _injectCSS() {
    if (document.getElementById('gio-accordion-theme-styles')) return;
    const style = document.createElement('style');
    style.id = 'gio-accordion-theme-styles';
    style.textContent = `

   

     :root {
        --bg: #2d2d2d;
        --backghead: #484848;  
        --textoA: #4daafc;       
        --textoAlfa: #4daafc98;     
        --textotenue: #8c8e8f;
        --shadow: #00000093;  
            }
      


      .gio-acc-item {
        position: relative;
        background: var(--bg);
        border: 2px solid #292929;  
        border-radius: 10px; 
        display: flex;
        flex-direction: column;
        width: 70%;
        box-sizing: border-box;
        margin-bottom: 12px;
        transition: border-color 0.3s, box-shadow 0.2s;
        overflow: visible;
        flex-shrink: 0;
        min-width: 300;
-webkit-box-shadow: -6px 2px 50px 9px var(--shadow); 
box-shadow: -6px 2px 50px 9px var(--shadow);
    
      }
      .gio-acc-item.is-dragging {
        position: fixed !important;
        opacity: 0.92;
        z-index: 999999 !important;
        box-shadow: 0 16px 36px var(--shadow), 0 0 15px rgba(33, 96, 199, 0.04) !important;
        pointer-events: none;
        margin: 0 !important;
        border-color: #4daafc !important;
      }

      .gio-acc-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 14px;
        cursor: grab;
        user-select: none;
        background: var(--backghead);
        border-radius: 10px;
        min-height: 40px;
        transition: background 0.2s;
        height: 57px;
      }
   .gio-acc-header:hover {  volor:var(--textoA) }  
      .gio-acc-header:active { cursor: grabbing; }

      .gio-acc-title {
        color: var(--textotenue);
        font-size: 13px;
        font-weight: 600;
        pointer-events: none;
      }
        

      .gio-acc-chevron {
        width: 15px;
        height: 15px;
        stroke: #a0a0a0;
        stroke-width: 2.2;
        stroke-linecap: round;
        stroke-linejoin: round;
        fill: none;
        transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), stroke 0.2s;
        pointer-events: none;
      }
      .gio-acc-item.open > .gio-acc-header .gio-acc-chevron {
        transform: rotate(180deg);
        stroke: var(--textoA);
        stroke-width: 3px;
    filter: drop-shadow(0 0 12px var(--textoA));
   
      }

      .gio-acc-content {
        max-height: 0;
        opacity: 0;
        overflow: hidden;
        transition: max-height 0.26s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease;
        background: #1e1e1e;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
      }
      .gio-acc-item.open > .gio-acc-content {
        opacity: 1;
      }

      .gio-acc-body {
        padding: 12px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        box-sizing: border-box;
        width: 100%;
        background: #2d2d2d;
      }
    `;
    document.head.appendChild(style);
  }

  constructor(title, parentElement = null, widthPercent = 100, maxHeight = 700) {
    GiovanniToggleAcordion._injectCSS();

    this.isOpen = false;
    this.maxHeight = maxHeight;
    this.widthPercent = widthPercent;

    this.element = document.createElement('div');
    this.element.className = 'gio-acc-item';
    this.element._gioAcordion = this;

    this.header = document.createElement('div');
    this.header.className = 'gio-acc-header';

    this.titleSpan = document.createElement('span');
    this.titleSpan.className = 'gio-acc-title';
    this.titleSpan.textContent = title;

    this.chevron = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.chevron.setAttribute('viewBox', '0 0 24 24');
    this.chevron.setAttribute('class', 'gio-acc-chevron');
    this.chevron.innerHTML = '<polyline points="6 9 12 15 18 9"></polyline>';

    this.header.appendChild(this.titleSpan);
    this.header.appendChild(this.chevron);

    this.content = document.createElement('div');
    this.content.className = 'gio-acc-content';

    this.body = document.createElement('div');
    this.body.className = 'gio-acc-body';

    this.content.appendChild(this.body);
    this.element.appendChild(this.header);
    this.element.appendChild(this.content);

    this._setupResizeObserver();
    this._initMagneticDrag();

    if (parentElement) this.adaptToParent(parentElement);
  }

  _setupResizeObserver() {
    this._ro = new ResizeObserver(() => {
      if (this.isOpen) this._updateHeight(true);
    });
    this._ro.observe(this.body);
  }

  _updateHeight(open) {
    if (!open) {
      this.content.style.overflow = 'hidden';
      this.content.style.maxHeight = '0px';
      return;
    }
    const scrollH = this.body.scrollHeight;
    if (scrollH > this.maxHeight) {
      this.content.style.maxHeight = `${this.maxHeight}px`;
      this.content.style.overflowY = 'auto';
    } else {
      this.content.style.maxHeight = `${scrollH + 30}px`;
      this.content.style.overflow = 'visible';
    }
  }

  adaptToParent(container, insertBefore = null) {
    if (!container || !(container instanceof HTMLElement)) container = document.body;
    this.element.classList.remove('is-dragging');
    const w = typeof this.widthPercent === 'number' ? `${this.widthPercent}%` : this.widthPercent;
    this.element.style.width = w;
    this.element.style.maxWidth = w;
    this.element.style.position = '';
    this.element.style.left = '';
    this.element.style.top = '';
    this.element.style.pointerEvents = '';

    if (insertBefore && insertBefore.parentNode === container) {
      container.insertBefore(this.element, insertBefore);
    } else {
      container.appendChild(this.element);
    }
  }

  toggle() { this.isOpen ? this.close() : this.open(); }
  open() {
    this.isOpen = true;
    this.element.classList.add('open');
    this._updateHeight(true);
    return this;
  }
  close() {
    this.isOpen = false;
    this.element.classList.remove('open');
    this._updateHeight(false);
    return this;
  }

  _initMagneticDrag() {
    let startX = 0, startY = 0, initLeft = 0, initTop = 0;
    let isDragging = false, hasMoved = false;
    const threshold = 16;

    let placeholder = document.getElementById('gio-snap-placeholder');
    if (!placeholder) {
      placeholder = document.createElement('div');
      placeholder.id = 'gio-snap-placeholder';
      placeholder.style.cssText = 'border:2px dashed #4daafc; border-radius:8px; background:rgba(33, 96, 199, 0.15); margin-bottom:12px; display:none; pointer-events:none; width:100%; box-sizing:border-box; transition:height 0.15s; flex-shrink:0;';
      document.body.appendChild(placeholder);
    }

    let guideV = document.getElementById('gio-snap-v') || (() => {
      const g = document.createElement('div'); g.id = 'gio-snap-v';
      g.style.cssText = 'position:fixed; top:0; bottom:0; width:1px; background:#4daafc; box-shadow:0 0 8px #4daafc; z-index:9999999; display:none; pointer-events:none;';
      document.body.appendChild(g); return g;
    })();

    let guideH = document.getElementById('gio-snap-h') || (() => {
      const g = document.createElement('div'); g.id = 'gio-snap-h';
      g.style.cssText = 'position:fixed; left:0; right:0; height:1px; background:#4daafc; box-shadow:0 0 8px #4daafc; z-index:9999999; display:none; pointer-events:none;';
      document.body.appendChild(g); return g;
    })();

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      if (!hasMoved && Math.hypot(dx, dy) > 6) {
        hasMoved = true;
        const rect = this.element.getBoundingClientRect();
        placeholder.style.height = `${rect.height}px`;
        placeholder.style.display = 'block';
        if (this.element.parentNode) {
          this.element.parentNode.insertBefore(placeholder, this.element.nextSibling);
        }

        document.body.appendChild(this.element);
        this.element.classList.add('is-dragging');
        this.element.style.width = `${rect.width}px`;
        initLeft = rect.left;
        initTop = rect.top;
      }

      if (!hasMoved) return;

      let targetX = initLeft + dx;
      let targetY = initTop + dy;

      this.element.style.pointerEvents = 'none';
      const hits = document.elementsFromPoint(e.clientX, e.clientY);
      this.element.style.pointerEvents = 'auto';

      const dropTarget = hits.find(el => el !== this.element && el !== placeholder && (
        el.classList.contains('gio-acc-item') ||
        el.classList.contains('app-workspace') ||
        el.classList.contains('gio-acc-body')
      ));

      if (dropTarget) {
        guideV.style.display = 'none';
        guideH.style.display = 'none';
        const r = dropTarget.getBoundingClientRect();
        if (dropTarget.classList.contains('gio-acc-item')) {
          dropTarget.parentNode?.insertBefore(placeholder, e.clientY < r.top + r.height / 2 ? dropTarget : dropTarget.nextSibling);
        } else {
          dropTarget.appendChild(placeholder);
        }
      } else {
        const w = this.element.offsetWidth;
        const h = this.element.offsetHeight;
        let snapX = null, snapY = null;

        if (Math.abs(targetX) < threshold) { targetX = 0; snapX = 0; }
        if (Math.abs(targetY) < threshold) { targetY = 0; snapY = 0; }
        if (Math.abs(targetX + w - window.innerWidth) < threshold) { targetX = window.innerWidth - w; snapX = window.innerWidth; }
        if (Math.abs(targetY + h - window.innerHeight) < threshold) { targetY = window.innerHeight - h; snapY = window.innerHeight; }

        guideV.style.display = snapX !== null ? 'block' : 'none';
        if (snapX !== null) guideV.style.left = `${snapX}px`;
        guideH.style.display = snapY !== null ? 'block' : 'none';
        if (snapY !== null) guideH.style.top = `${snapY}px`;
      }

      this.element.style.left = `${targetX}px`;
      this.element.style.top = `${targetY}px`;
    };

    const onPointerUp = () => {
      if (!isDragging) return;
      isDragging = false;
      guideV.style.display = 'none';
      guideH.style.display = 'none';

      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);

      if (!hasMoved) {
        this.toggle();
        return;
      }

      if (placeholder.parentNode) {
        placeholder.parentNode.insertBefore(this.element, placeholder);
        placeholder.style.display = 'none';
        placeholder.remove();
      }

      this.element.classList.remove('is-dragging');
      this.element.style.position = '';
      this.element.style.left = '';
      this.element.style.top = '';
      this.element.style.pointerEvents = '';
      const w = typeof this.widthPercent === 'number' ? `${this.widthPercent}%` : this.widthPercent;
      this.element.style.width = w;
      this.element.style.maxWidth = w;

      if (this.isOpen) {
        this._updateHeight(true);
      }
    };

    this.header.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 || e.target.closest('button, input')) return;
      isDragging = true;
      hasMoved = false;
      startX = e.clientX;
      startY = e.clientY;
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
    });
  }

  append(child) { return this.addChild(child); }
  addChild(child) {
    if (!child) return this;
    const node = child.element || (child instanceof HTMLElement ? child : null);
    if (node) {
      this.body.appendChild(node);
      if (this.isOpen) this._updateHeight(true);
    }
    return this;
  }
}

const injectStyles = `
  /*   ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }
    ::-webkit-scrollbar-track {
        background: transparent;
    }
    ::-webkit-scrollbar-thumb {
        background: #444; 
        border-radius: 3px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: #666;
    } */

        *::-webkit-scrollbar {
    width: 6px;
    height: 6px;  
}
*::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.15);
}
*::-webkit-scrollbar-thumb {
    background: #555;
    border-radius: 4px;
}
*::-webkit-scrollbar-thumb:hover {
    background: #777;
}
`;
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = injectStyles;
document.head.appendChild(styleSheet);

 
class Giovanni {
    static _cssInjected = false;
    static _injectGlobalStyles() {
        if (Giovanni._cssInjected) return;
        Giovanni._cssInjected = true;
        const style = document.createElement('style');
        style.id = 'gio-core-engine-styles';
        style.textContent = `
            :root {
                --backg0: #2d2d2d;
                --backg1: #2d2d2d;
                --backg2: #2d2d2d;
                --backg3: #2d2d2d;
                --backg: #303030;
                --borde: #4d4d4d;
                 
                --slidernofill: #4a4a4a;
                --sliderfill: #363636;
                --texto: #8c8e8f;
     
         
                --textoActivo: #e3e3e3bb;
                --textodisable: #60605f;
                --textoActvioBlue: #4daafc;
                --textoledBrillo: #2f3b46;
                --danger: #f85149;
                --radius: 6px;
                --scrollbar-size: 5px;
            }

            .gio-menu {
    position: fixed;
    z-index: 9999;
    display: flex;
    flex-direction: row;
    gap: var(--gio-gap, 8px);
    padding: var(--gio-padding, 8px);
    background: var(--backg1);
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.5);
    transition: transform .28s ease, opacity .28s ease;
    max-width: calc(100vw - 24px);
    max-height: calc(100vh - 24px);
    box-sizing: border-box;
}
.gio-menu.gio-left   { left: 0;  top: 50%; transform: translateY(-50%); flex-direction: column; border-radius: 0 var(--radius) var(--radius) 0; }
.gio-menu.gio-right  { right: 0; top: 50%; transform: translateY(-50%); flex-direction: column; border-radius: var(--radius) 0 0 var(--radius); }
.gio-menu.gio-top    { top: 0;    left: 50%; transform: translateX(-50%); border-radius: 0 0 var(--radius) var(--radius); }
.gio-menu.gio-bottom { bottom: 0; left: 50%; transform: translateX(-50%); border-radius: var(--radius) var(--radius) 0 0; }

.gio-menu-list {
    display: flex;
    flex-direction: column;
    gap: var(--gio-gap, 8px);
    max-height: calc(100vh - 100px);
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-gutter: stable;
}
.gio-menu.gio-top .gio-menu-list,
.gio-menu.gio-bottom .gio-menu-list {
    flex-direction: row;
    max-height: none;
    max-width: calc(100vw - 100px);
    overflow-y: hidden;
    overflow-x: auto;
}

.gio-btn {
    position: relative;
    width: var(--gio-btn-size, 44px);
    height: var(--gio-btn-size, 44px);
    min-width: var(--gio-btn-size, 44px);
    border: none;
    border-radius: var(--gio-btn-radius, 10px);
    background: var(--backg0);
    color: var(--texto);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background .18s, color .18s, transform .12s, opacity .2s;
    padding: 0;
    flex-shrink: 0;
}
.gio-btn:hover  { background: var(--backg3); color: var(--textoActvioBlue); }
.gio-btn:active { transform: scale(.94); }
.gio-btn.gio-active { color: var(--textoActvioBlue); background: var(--textoledBrillo); }
.gio-btn svg { width: var(--gio-icon-size, 22px); height: var(--gio-icon-size, 22px); fill: currentColor; pointer-events: none; }
.gio-btn.gio-burger { color: var(--textoActvioBlue); }

.gio-menu.gio-collapsed .gio-menu-list {
    display: none;
}
.gio-menu.gio-collapsed.gio-left   { transform: translateY(-50%) translateX(-2px); }
.gio-menu.gio-collapsed.gio-right  { transform: translateY(-50%) translateX(2px); }
.gio-menu.gio-collapsed.gio-top    { transform: translateX(-50%) translateY(-2px); }
.gio-menu.gio-collapsed.gio-bottom { transform: translateX(-50%) translateY(2px); }
.gio-menu.gio-collapsed { padding: calc(var(--gio-padding, 8px) * 0.75); gap: 0; }

.gio-tooltip {
    position: fixed;
    padding: 6px 10px;
    background: var(--backg0);
    color: var(--textoActivo);
    font-size: 12px;
    font-family: system-ui, sans-serif;
    white-space: nowrap;
    border-radius: 6px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.6);
    pointer-events: none;
    opacity: 0;
    transform: translateY(-50%) scale(.9);
    transition: opacity .15s, transform .15s;
    z-index: 10000;
    border: 1px solid var(--borde);
}
.gio-tooltip.gio-visible { opacity: 1; transform: translateY(-50%) scale(1); }

            .gio-container *::-webkit-scrollbar,
            .gio-custom-scroll::-webkit-scrollbar {
                width: var(--scrollbar-size);
                height: var(--scrollbar-size);
            }
            .gio-container *::-webkit-scrollbar-track,
            .gio-custom-scroll::-webkit-scrollbar-track {
                background: transparent;
            }
            .gio-container *::-webkit-scrollbar-thumb,
            .gio-custom-scroll::-webkit-scrollbar-thumb {
                background: var(--borde);
                border-radius: 10px;
            }
            .gio-container *::-webkit-scrollbar-thumb:hover,
            .gio-custom-scroll::-webkit-scrollbar-thumb:hover {
                background: var(--textoledBrillo);
            }
            .gio-container * {
                scrollbar-width: thin;
                scrollbar-color: var(--borde) transparent;
            }

            .gio-container {
                width: 100%;
                max-width: 100%;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                gap: 12px;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                color: var(--texto);
            }

            /* CAMPO ARRASTRABLE */
            .gio-field {
                width: 100%;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                gap: 6px;
                background: var(--backg1);
                border: 1px solid var(--borde);
                border-radius: var(--radius);
                padding: 8px 10px;
                transition: border-color 0.2s, box-shadow 0.2s;
                position: relative;
            }
            .gio-field:hover {
                border-color: #5c5c5c;
            }

            /* ESTADO ARRASTRÁNDOSE (IDÉNTICO A GIOVANNI TOGGLE ACORDION) */
            .gio-field.is-dragging {
                position: fixed !important;
                opacity: 0.92;
                z-index: 999999 !important;
                box-shadow: 0 16px 36px rgba(0,0,0,0.8), 0 0 15px rgba(33, 96, 199, 0.4) !important;
                pointer-events: none;
                margin: 0 !important;
                border-color: #4daafc !important;
                background: var(--backg1) !important;
            }

            /* ASA DE ARRASTRE */
            .gio-field-handle {
                display: flex;
                align-items: center;
                justify-content: space-between;
                cursor: grab;
                user-select: none;
                padding-bottom: 4px;
                border-bottom: 1px dashed rgba(255, 255, 255, 0.08);
                margin-bottom: 4px;
            }
            .gio-field-handle:hover {
                border-bottom-color: var(--textoActvioBlue);
            }
            .gio-field-handle:active {
                cursor: grabbing;
            }

            .gio-field-label {
                font-size: 10px;
                text-transform: uppercase;
                letter-spacing: 0.8px;
                color: var(--textoAlfa);
                font-weight: 700;
                pointer-events: none;
            }

            .gio-grip-icon {
                width: 12px;
                height: 12px;
                fill: var(--textodisable);
                pointer-events: none;
                transition: fill 0.2s;
            }
            .gio-field-handle:hover .gio-grip-icon {
                fill: var(--textoActvioBlue);
            }

            /* EMISIÓN LED EXACTA */
            .gio-led-exacto {
                background: var(--textoledBrillo) !important;
                -webkit-box-shadow: 0px 1px 57px 13px var(--textoledBrillo) !important;
                box-shadow: 0px 1px 57px 13px var(--textoledBrillo) !important;
            }

            @keyframes gioFadeIn {
                from { opacity: 0; transform: translateY(-4px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        (document.head || document.documentElement).appendChild(style);
    }

    constructor() {
        Giovanni._injectGlobalStyles();
        this.element = document.createElement('div');
        this.element.className = 'gio-container';
    }

 
    _initMagneticDrag(fieldElement, handleElement) {
        let startX = 0, startY = 0, initLeft = 0, initTop = 0;
        let isDragging = false, hasMoved = false;
        const threshold = 16;  

 
        let placeholder = document.getElementById('gio-snap-placeholder');
        if (!placeholder) {
            placeholder = document.createElement('div');
            placeholder.id = 'gio-snap-placeholder';
            placeholder.style.cssText = 'border:2px dashed #4daafc; border-radius:8px; background:rgba(33, 96, 199, 0.15); margin-bottom:12px; display:none; pointer-events:none; width:100%; box-sizing:border-box; transition:height 0.15s;';
            document.body.appendChild(placeholder);
        }

   
        let guideV = document.getElementById('gio-snap-v') || (() => {
            const g = document.createElement('div'); g.id = 'gio-snap-v';
            g.style.cssText = 'position:fixed; top:0; bottom:0; width:1px; background:#4daafc; box-shadow:0 0 8px #4daafc; z-index:9999999; display:none; pointer-events:none;';
            document.body.appendChild(g); return g;
        })();

        let guideH = document.getElementById('gio-snap-h') || (() => {
            const g = document.createElement('div'); g.id = 'gio-snap-h';
            g.style.cssText = 'position:fixed; left:0; right:0; height:1px; background:#4daafc; box-shadow:0 0 8px #4daafc; z-index:9999999; display:none; pointer-events:none;';
            document.body.appendChild(g); return g;
        })();

        const onPointerMove = (e) => {
            if (!isDragging) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            if (!hasMoved && Math.hypot(dx, dy) > 6) {
                hasMoved = true;
                const rect = fieldElement.getBoundingClientRect();
                placeholder.style.height = `${rect.height}px`;
                placeholder.style.display = 'block';

                if (fieldElement.parentNode) {
                    fieldElement.parentNode.insertBefore(placeholder, fieldElement.nextSibling);
                }

                document.body.appendChild(fieldElement);
                fieldElement.classList.add('is-dragging');
                fieldElement.style.width = `${rect.width}px`;
                initLeft = rect.left;
                initTop = rect.top;
            }

            if (!hasMoved) return;

            let targetX = initLeft + dx;
            let targetY = initTop + dy;

            fieldElement.style.pointerEvents = 'none';
            const hits = document.elementsFromPoint(e.clientX, e.clientY);
            fieldElement.style.pointerEvents = 'auto';

           
            const dropTarget = hits.find(el => el !== fieldElement && el !== placeholder && (
                el.classList.contains('gio-acc-item') ||
                el.classList.contains('gio-acc-body') ||
                el.classList.contains('app-workspace') ||
                el.classList.contains('gio-container') ||
                el.classList.contains('gio-field')
            ));

            if (dropTarget) {
                guideV.style.display = 'none';
                guideH.style.display = 'none';
                placeholder.style.display = 'block';

                const r = dropTarget.getBoundingClientRect();
                if (dropTarget.classList.contains('gio-field') || dropTarget.classList.contains('gio-acc-item')) {
                    dropTarget.parentNode?.insertBefore(placeholder, e.clientY < r.top + r.height / 2 ? dropTarget : dropTarget.nextSibling);
                } else if (dropTarget.classList.contains('gio-acc-body') || dropTarget.classList.contains('gio-container') || dropTarget.classList.contains('app-workspace')) {
                    dropTarget.appendChild(placeholder);
                }
            } else {
            
                placeholder.style.display = 'none';
                const w = fieldElement.offsetWidth;
                const h = fieldElement.offsetHeight;
                let snapX = null, snapY = null;

                if (Math.abs(targetX) < threshold) { targetX = 0; snapX = 0; }
                if (Math.abs(targetY) < threshold) { targetY = 0; snapY = 0; }
                if (Math.abs(targetX + w - window.innerWidth) < threshold) { targetX = window.innerWidth - w; snapX = window.innerWidth; }
                if (Math.abs(targetY + h - window.innerHeight) < threshold) { targetY = window.innerHeight - h; snapY = window.innerHeight; }

                guideV.style.display = snapX !== null ? 'block' : 'none';
                if (snapX !== null) guideV.style.left = `${snapX}px`;
                guideH.style.display = snapY !== null ? 'block' : 'none';
                if (snapY !== null) guideH.style.top = `${snapY}px`;
            }

            fieldElement.style.left = `${targetX}px`;
            fieldElement.style.top = `${targetY}px`;
        };

        const onPointerUp = () => {
            if (!isDragging) return;
            isDragging = false;
            guideV.style.display = 'none';
            guideH.style.display = 'none';

            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', onPointerUp);

            if (!hasMoved) return;

            if (placeholder.style.display !== 'none' && placeholder.parentNode) {
           
                placeholder.parentNode.insertBefore(fieldElement, placeholder);
                placeholder.style.display = 'none';
                placeholder.remove();

                fieldElement.classList.remove('is-dragging');
                fieldElement.style.position = '';
                fieldElement.style.left = '';
                fieldElement.style.top = '';
                fieldElement.style.width = '100%';
            } else {
           
                placeholder.style.display = 'none';
                if (placeholder.parentNode) placeholder.remove();

                fieldElement.classList.remove('is-dragging');
                fieldElement.style.position = 'fixed';
                fieldElement.style.zIndex = '999999';
                fieldElement.style.margin = '0';
            }
        };

        handleElement.addEventListener('pointerdown', (e) => {
            if (e.button !== 0 || e.target.closest('button, input, select, textarea, .gio-led-exacto')) return;
            isDragging = true;
            hasMoved = false;
            startX = e.clientX;
            startY = e.clientY;
            window.addEventListener('pointermove', onPointerMove);
            window.addEventListener('pointerup', onPointerUp);
        });
    }

    _wrapWithLabel(label, el) {
        const wrap = document.createElement('div');
        wrap.className = 'gio-field';

        const handle = document.createElement('div');
        handle.className = 'gio-field-handle';

        const lbl = document.createElement('span');
        lbl.className = 'gio-field-label';
        lbl.textContent = label || 'Control';

        const grip = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        grip.setAttribute('viewBox', '0 0 24 24');
        grip.setAttribute('class', 'gio-grip-icon');
        grip.innerHTML = `
            <circle cx="8" cy="6" r="1.8"/>
            <circle cx="16" cy="6" r="1.8"/>
            <circle cx="8" cy="12" r="1.8"/>
            <circle cx="16" cy="12" r="1.8"/>
            <circle cx="8" cy="18" r="1.8"/>
            <circle cx="16" cy="18" r="1.8"/>
        `;

        handle.appendChild(lbl);
        handle.appendChild(grip);

        wrap.appendChild(handle);
        wrap.appendChild(el);

        this._initMagneticDrag(wrap, handle);

        this.element.appendChild(wrap);
        return wrap;
    }
    static _tooltipRegistry = { el: null };

static _ensureTooltipEl() {
  if (!Giovanni._tooltipRegistry.el) {
    const t = document.createElement('div');
    t.className = 'gio-tooltip';
    document.body.appendChild(t);
    Giovanni._tooltipRegistry.el = t;
  }
  return Giovanni._tooltipRegistry.el;
}

static _showGlobalTooltip(target, text, position) {
  if (!text) return;
  const tt = Giovanni._ensureTooltipEl();
  tt.textContent = text;
  tt.classList.add('gio-visible');

  requestAnimationFrame(() => {
    const r = target.getBoundingClientRect();
    const tw = tt.offsetWidth;
    const th = tt.offsetHeight;
    const g = 10;
    let top, left, origin = 'center center';

    switch (position) {
      case 'left':   left = r.right + g; top = r.top + r.height / 2; origin = 'left center'; break;
      case 'right':  left = r.left - tw - g; top = r.top + r.height / 2; origin = 'right center'; break;
      case 'top':    left = r.left + r.width / 2 - tw / 2; top = r.bottom + g + th / 2; break;
      case 'bottom':
      default:       left = r.left + r.width / 2 - tw / 2; top = r.top - g - th / 2; break;
    }

    const m = 6;
    if (left < m) left = m;
    if (left + tw > window.innerWidth - m) left = window.innerWidth - tw - m;
    if (top - th / 2 < m) top = th / 2 + m;
    if (top + th / 2 > window.innerHeight - m) top = window.innerHeight - th / 2 - m;

    tt.style.left = `${left}px`;
    tt.style.top  = `${top}px`;
    tt.style.transformOrigin = origin;
  });
}

static _hideGlobalTooltip() {
  Giovanni._tooltipRegistry.el?.classList.remove('gio-visible');
}
createBottomMenu({
  buttons = [],
  id = `gio-bottom-${Math.random().toString(36).slice(2, 8)}`,
  offset = 20,
  gap = 8,
  padding = 6,
  buttonSize = 36,
  iconSize = 18,
  radius = 10,
  bg = 'var(--backg1)',
  border = 'var(--borde)',
  defaultOnClick = null
} = {}) {

  const wrap = document.createElement('div');
  wrap.id = id;
  wrap.style.cssText = `
    position: fixed; bottom: ${offset}px; left: 50%;
    transform: translateX(-50%);
    display: flex; gap: ${gap}px;
    padding: ${padding}px;
    background: ${bg};
    border: 1px solid ${border};
    border-radius: ${radius}px;
    box-shadow: 0 4px 14px rgba(0,0,0,0.5);
    z-index: 9999;
    max-width: calc(100vw - ${offset * 2}px);
    box-sizing: border-box;
    align-items: center;
  `;

  const listEl = document.createElement('div');
  listEl.className = 'gio-custom-scroll';
  listEl.style.cssText = `display:flex; gap:${gap}px; overflow-x:auto; overflow-y:hidden; max-width:100%; align-items:center;`;

  const created = [];

  const makeBtn = ({ icon, tooltip = '', bId = null, active = false, separator = false, onClick = null }) => {
    if (separator) {
      const sep = document.createElement('div');
      sep.style.cssText = 'width:1px; height:20px; background:var(--borde); flex-shrink:0;';
      listEl.appendChild(sep);
      return { el: sep, isSeparator: true, remove: () => sep.remove() };
    }

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'gio-btn' + (active ? ' gio-active' : '');
    btn.dataset.tooltip = tooltip;
    if (bId) btn.dataset.id = bId;
    btn.style.width = `${buttonSize}px`;
    btn.style.height = `${buttonSize}px`;
    btn.style.minWidth = `${buttonSize}px`;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.style.width = `${iconSize}px`;
    svg.style.height = `${iconSize}px`;
    svg.innerHTML = GiovanniIconDB[icon] || GiovanniIconDB.square;
    btn.appendChild(svg);

    btn.addEventListener('mouseenter', () => Giovanni._showGlobalTooltip(btn, btn.dataset.tooltip, 'bottom'));
    btn.addEventListener('mouseleave', () => Giovanni._hideGlobalTooltip());
    btn.addEventListener('focus', () => Giovanni._showGlobalTooltip(btn, btn.dataset.tooltip, 'bottom'));
    btn.addEventListener('blur', () => Giovanni._hideGlobalTooltip());
    btn.addEventListener('click', (e) => {
      if (typeof onClick === 'function') onClick(btn, e);
      else if (typeof defaultOnClick === 'function') defaultOnClick(btn, e);
    });

    const ref = {
      el: btn, id: bId,
      setActive: (v = true) => btn.classList.toggle('gio-active', v),
      setTooltip: (t) => { btn.dataset.tooltip = t; },
      setIcon: (k) => { svg.innerHTML = GiovanniIconDB[k] || GiovanniIconDB.square; },
      remove: () => { btn.remove(); const i = created.indexOf(ref); if (i > -1) created.splice(i, 1); }
    };
    created.push(ref);
    listEl.appendChild(btn);
    return ref;
  };

  buttons.forEach(b => makeBtn(b));
  wrap.appendChild(listEl);
  document.body.appendChild(wrap);

  return {
    el: wrap, listEl, id, buttons: created,
    createButton: makeBtn,
    show: () => wrap.style.display = '',
    hide: () => wrap.style.display = 'none',
    destroy: () => { wrap.remove(); created.length = 0; },
    getButton: (bid) => created.find(b => b.id === bid)
  };
}
createToolbar({
  buttons = [],
  container = null,
  orientation = 'horizontal',
  gap = 8,
  padding = 6,
  bg = 'var(--backg1)',
  border = '1px solid var(--borde)',
  radius = 10,
  buttonSize = 36,
  iconSize = 18,
  defaultOnClick = null,
  tooltipPosition = null
} = {}) {

  const wrap = document.createElement('div');
  wrap.style.cssText = `
    display:inline-flex;
    flex-direction:${orientation === 'vertical' ? 'column' : 'row'};
    align-items:center;
    gap:${gap}px; padding:${padding}px;
    background:${bg}; border:${border}; border-radius:${radius}px;
    box-sizing:border-box;
  `;

  const created = [];
  const ttPos = tooltipPosition || (orientation === 'vertical' ? 'right' : 'bottom');

  const makeBtn = ({ icon, tooltip = '', bId = null, active = false, separator = false, onClick = null }) => {
    if (separator) {
      const sep = document.createElement('div');
      sep.style.cssText = orientation === 'vertical'
        ? 'height:1px; width:20px; background:var(--borde); flex-shrink:0; margin:2px 0;'
        : 'width:1px; height:20px; background:var(--borde); flex-shrink:0; margin:0 2px;';
      wrap.appendChild(sep);
      return { el: sep, isSeparator: true, remove: () => sep.remove() };
    }

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'gio-btn' + (active ? ' gio-active' : '');
    btn.dataset.tooltip = tooltip;
    if (bId) btn.dataset.id = bId;
    btn.style.width = `${buttonSize}px`;
    btn.style.height = `${buttonSize}px`;
    btn.style.minWidth = `${buttonSize}px`;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.style.width = `${iconSize}px`;
    svg.style.height = `${iconSize}px`;
    svg.innerHTML = GiovanniIconDB[icon] || GiovanniIconDB.square;
    btn.appendChild(svg);

    btn.addEventListener('mouseenter', () => Giovanni._showGlobalTooltip(btn, btn.dataset.tooltip, ttPos));
    btn.addEventListener('mouseleave', () => Giovanni._hideGlobalTooltip());
    btn.addEventListener('focus', () => Giovanni._showGlobalTooltip(btn, btn.dataset.tooltip, ttPos));
    btn.addEventListener('blur', () => Giovanni._hideGlobalTooltip());
    btn.addEventListener('click', (e) => {
      if (typeof onClick === 'function') onClick(btn, e);
      else if (typeof defaultOnClick === 'function') defaultOnClick(btn, e);
    });

    const ref = {
      el: btn, id: bId,
      setActive: (v = true) => btn.classList.toggle('gio-active', v),
      setTooltip: (t) => { btn.dataset.tooltip = t; },
      setIcon: (k) => { svg.innerHTML = GiovanniIconDB[k] || GiovanniIconDB.square; },
      remove: () => { btn.remove(); const i = created.indexOf(ref); if (i > -1) created.splice(i, 1); }
    };
    created.push(ref);
    wrap.appendChild(btn);
    return ref;
  };

  buttons.forEach(b => makeBtn(b));
  if (container) container.appendChild(wrap);

  return {
    el: wrap, buttons: created,
    createButton: makeBtn,
    destroy: () => { wrap.remove(); created.length = 0; },
    getButton: (bid) => created.find(b => b.id === bid)
  };
}
    createUniversalMenu({
        position = 'left',
        buttons = [],
        id = `gio-menu-${Math.random().toString(36).slice(2, 8)}`,
        collapsible = true,
        defaultCollapsed = false,
        burgerTooltip = 'Mostrar / ocultar menú',
        buttonSize = 44,
        iconSize = 22,
        radius = 10,
        gap = 8,
        padding = 8,
        defaultOnClick = null
    } = {}) {

        
        const STYLE_ID = 'gio-universal-menu-styles';
        if (!document.getElementById(STYLE_ID)) {
            const style = document.createElement('style');
            style.id = STYLE_ID;
            style.textContent = `
                .gio-menu {
                    position: fixed;
                    z-index: 9999;
                    display: flex;
                    gap: var(--gio-gap, 8px);
                    padding: var(--gio-padding, 8px);
                    background: var(--backg1, #2d2d2d);
                    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.5);
                    transition: transform .28s ease, opacity .28s ease;
                    max-width: calc(100vw - 24px);
                    max-height: calc(100vh - 24px);
                    box-sizing: border-box;
                }
                .gio-menu.gio-left   { left: 0;  top: 50%; transform: translateY(-50%); flex-direction: column; border-radius: 0 var(--radius, 6px) var(--radius, 6px) 0; }
                .gio-menu.gio-right  { right: 0; top: 50%; transform: translateY(-50%); flex-direction: column; border-radius: var(--radius, 6px) 0 0 var(--radius, 6px); }
                .gio-menu.gio-top    { top: 0;    left: 50%; transform: translateX(-50%); flex-direction: row;    border-radius: 0 0 var(--radius, 6px) var(--radius, 6px); }
                .gio-menu.gio-bottom { bottom: 0; left: 50%; transform: translateX(-50%); flex-direction: row;    border-radius: var(--radius, 6px) var(--radius, 6px) 0 0; }

                .gio-menu-list {
                    display: flex;
                    flex-direction: column;
                    gap: var(--gio-gap, 8px);
                    max-height: calc(100vh - 100px);
                    overflow-y: auto;
                    overflow-x: hidden;
                    scrollbar-gutter: stable;
                }
                .gio-menu.gio-top .gio-menu-list,
                .gio-menu.gio-bottom .gio-menu-list {
                    flex-direction: row;
                    max-height: none;
                    max-width: calc(100vw - 100px);
                    overflow-y: hidden;
                    overflow-x: auto;
                }

                .gio-btn {
                    position: relative;
                    width: var(--gio-btn-size, 44px);
                    height: var(--gio-btn-size, 44px);
                    min-width: var(--gio-btn-size, 44px);
                    border: none;
                    border-radius: var(--gio-btn-radius, 10px);
                    background: var(--backg0, #333);
                    color: var(--texto, #8c8e8f);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: background .18s, color .18s, transform .12s, opacity .2s;
                    padding: 0;
                    flex-shrink: 0;
                }
                .gio-btn:hover  { background: var(--backg3, #3d3d3d); color: var(--textoActvioBlue, #4daafc); }
                .gio-btn:active { transform: scale(.94); }
                .gio-btn.gio-active { color: var(--textoActvioBlue, #4daafc); background: var(--textoledBrillo, #383f48); }
                .gio-btn svg { width: var(--gio-icon-size, 22px); height: var(--gio-icon-size, 22px); fill: currentColor; pointer-events: none; }
                .gio-btn.gio-burger { color: var(--textoActvioBlue, #4daafc); }

                .gio-menu.gio-collapsed .gio-menu-list {
                    display: none;
                }
                .gio-menu.gio-collapsed.gio-left   { transform: translateY(-50%) translateX(-2px); }
                .gio-menu.gio-collapsed.gio-right  { transform: translateY(-50%) translateX(2px); }
                .gio-menu.gio-collapsed.gio-top    { transform: translateX(-50%) translateY(-2px); }
                .gio-menu.gio-collapsed.gio-bottom { transform: translateX(-50%) translateY(2px); }
                .gio-menu.gio-collapsed { padding: calc(var(--gio-padding, 8px) * 0.75); gap: 0; }

                .gio-tooltip {
                    position: fixed;
                    padding: 6px 10px;
                    background: var(--backg0, #1a1a1a);
                    color: var(--textoActivo, #e7e7e7);
                    font-size: 12px;
                    font-family: system-ui, sans-serif;
                    white-space: nowrap;
                    border-radius: 6px;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.6);
                    pointer-events: none;
                    opacity: 0;
                    transform: translateY(-50%) scale(.9);
                    transition: opacity .15s, transform .15s;
                    z-index: 10000;
                    border: 1px solid var(--borde, #444);
                }
                .gio-tooltip.gio-visible { opacity: 1; transform: translateY(-50%) scale(1); }
            `;
            document.head.appendChild(style);
        }

  
        const menuEl = document.createElement('div');
        menuEl.id = id;
        menuEl.className = `gio-menu gio-${position}`;
        menuEl.style.setProperty('--gio-btn-size',   `${buttonSize}px`);
        menuEl.style.setProperty('--gio-icon-size',  `${iconSize}px`);
        menuEl.style.setProperty('--gio-btn-radius', `${radius}px`);
        menuEl.style.setProperty('--gio-gap',        `${gap}px`);
        menuEl.style.setProperty('--gio-padding',    `${padding}px`);

        const listEl = document.createElement('div');
        listEl.className = 'gio-menu-list gio-custom-scroll';

        let collapsed = false;
        let burgerRef = null;
        const createdButtons = [];

        const createButton = ({ icon, tooltip = '', bId = null, active = false, onClick = null, separator = false }) => {
            if (separator) {
                const sep = document.createElement('div');
                sep.style.cssText = position === 'left' || position === 'right' 
                    ? 'height:1px; width:100%; background:var(--borde, #4d4d4d); margin:4px 0; flex-shrink:0;' 
                    : 'width:1px; height:100%; background:var(--borde, #4d4d4d); margin:0 4px; flex-shrink:0;';
                listEl.appendChild(sep);
                return { el: sep, isSeparator: true };
            }

            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'gio-btn' + (active ? ' gio-active' : '');
            if (bId) btn.dataset.id = bId;
            btn.dataset.tooltip = tooltip;

            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('viewBox', '0 0 24 24');
            svg.innerHTML = GiovanniIconDB[icon] || GiovanniIconDB.square;
            btn.appendChild(svg);

            let ttPos = 'right';
            if (position === 'right') ttPos = 'left';
            else if (position === 'top') ttPos = 'bottom';
            else if (position === 'bottom') ttPos = 'top';

            btn.addEventListener('mouseenter', () => Giovanni._showGlobalTooltip(btn, btn.dataset.tooltip, ttPos));
            btn.addEventListener('mouseleave', () => Giovanni._hideGlobalTooltip());
            btn.addEventListener('focus',      () => Giovanni._showGlobalTooltip(btn, btn.dataset.tooltip, ttPos));
            btn.addEventListener('blur',       () => Giovanni._hideGlobalTooltip());

            btn.addEventListener('click', (e) => {
                if (typeof onClick === 'function') onClick(btn, e);
                else if (typeof defaultOnClick === 'function') defaultOnClick(btn, e);
            });

            const ref = {
                el: btn,
                id: bId,
                setActive: (v = true) => btn.classList.toggle('gio-active', v),
                setTooltip: (t) => { btn.dataset.tooltip = t; },
                setIcon: (key) => { svg.innerHTML = GiovanniIconDB[key] || GiovanniIconDB.square; },
                remove: () => {
                    btn.remove();
                    const i = createdButtons.indexOf(ref);
                    if (i > -1) createdButtons.splice(i, 1);
                }
            };
            createdButtons.push(ref);
            listEl.appendChild(btn);
            return ref;
        };

        const collapse = () => {
            if (!collapsible || collapsed) return;
            collapsed = true;
            menuEl.classList.add('gio-collapsed');
            burgerRef?.setIcon('menu');
            Giovanni._hideGlobalTooltip();
        };
        
        const expand = () => {
            if (!collapsible || !collapsed) return;
            collapsed = false;
            menuEl.classList.remove('gio-collapsed');
            burgerRef?.setIcon('menuOpen');
        };
        
        const toggle = () => collapsed ? expand() : collapse();

        if (collapsible) {
            burgerRef = createButton({
                icon: 'menu',
                tooltip: burgerTooltip,
                bId: '__burger__',
                onClick: () => toggle()
            });
            burgerRef.el.classList.add('gio-burger');
            menuEl.appendChild(burgerRef.el);
        }

        buttons.forEach(b => createButton(b));

        menuEl.appendChild(listEl);
        document.body.appendChild(menuEl);

        if (defaultCollapsed) collapse();

       
        return {
            el: menuEl,
            listEl,
            id,
            buttons: createdButtons,
            createButton,
            toggle,
            collapse,
            expand,
            isCollapsed: () => collapsed,
            setSizes: (s = {}) => {
                if (s.buttonSize) menuEl.style.setProperty('--gio-btn-size',   `${s.buttonSize}px`);
                if (s.iconSize)   menuEl.style.setProperty('--gio-icon-size',  `${s.iconSize}px`);
                if (s.radius)     menuEl.style.setProperty('--gio-btn-radius', `${s.radius}px`);
                if (s.gap != null)menuEl.style.setProperty('--gio-gap',        `${s.gap}px`);
                if (s.padding != null)menuEl.style.setProperty('--gio-padding',`${s.padding}px`);
            },
            show: () => { menuEl.style.display = ''; },
            hide: () => { menuEl.style.display = 'none'; },
            destroy: () => {
                menuEl.remove();
                createdButtons.length = 0;
            },
            getButton: (bId) => createdButtons.find(b => b.id === bId)
        };
    }
createRibbonGroup({
  container = null,
  label = 'Grupo',
  buttons = [],
  buttonSize = 44,
  iconSize = 20,
  defaultOnClick = null
} = {}) {

  const group = document.createElement('div');
  group.className = 'gio-ribbon-group';
  group.style.cssText = `
    display:flex; flex-direction:column; align-items:center;
    border-right:1px solid var(--borde);
    padding-right:15px; height:100%; justify-content:space-between;
  `;

  const row = document.createElement('div');
  row.style.cssText = `display:flex; gap:5px; flex-wrap:wrap; justify-content:center; align-items:center; flex:1;`;

  const title = document.createElement('span');
  title.textContent = label;
  title.style.cssText = `font-size:10px; color:var(--texto); text-transform:uppercase; letter-spacing:.5px; margin-top:2px;`;

  const created = [];

  const makeBtn = ({ icon, text = '', tooltip = '', bId = null, active = false, onClick = null }) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'gio-btn' + (active ? ' gio-active' : '');
    btn.dataset.tooltip = tooltip || text;
    if (bId) btn.dataset.id = bId;
    btn.style.cssText = `
      display:flex; flex-direction:column; align-items:center; justify-content:center;
      background:transparent; border:1px solid transparent; color:var(--textoActivo);
      cursor:pointer; padding:4px 8px; border-radius:6px;
      transition:all .18s; min-width:${buttonSize}px;
    `;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.style.cssText = `width:${iconSize}px; height:${iconSize}px; margin-bottom:2px; fill:currentColor;`;
    svg.innerHTML = GiovanniIconDB[icon] || GiovanniIconDB.square;
    btn.appendChild(svg);

    if (text) {
      const span = document.createElement('span');
      span.textContent = text;
      span.style.cssText = `font-size:10px; text-align:center; line-height:1.1;`;
      btn.appendChild(span);
    }

    btn.addEventListener('mouseenter', () => {
      btn.style.background = 'var(--backg3)';
      btn.style.borderColor = 'var(--borde)';
      Giovanni._showGlobalTooltip(btn, btn.dataset.tooltip, 'bottom');
    });
    btn.addEventListener('mouseleave', () => {
      if (!btn.classList.contains('gio-active')) {
        btn.style.background = 'transparent';
        btn.style.borderColor = 'transparent';
      }
      Giovanni._hideGlobalTooltip();
    });
    btn.addEventListener('click', (e) => {
      if (typeof onClick === 'function') onClick(btn, e);
      else if (typeof defaultOnClick === 'function') defaultOnClick(btn, e);
    });

    const ref = {
      el: btn, id: bId,
      setActive: (v = true) => {
        btn.classList.toggle('gio-active', v);
        btn.style.background = v ? 'rgba(77,170,252,0.15)' : 'transparent';
        btn.style.borderColor = v ? 'var(--textoActvioBlue)' : 'transparent';
        btn.style.color = v ? 'var(--textoActvioBlue)' : 'var(--textoActivo)';
      },
      setTooltip: (t) => { btn.dataset.tooltip = t; },
      setIcon: (k) => { svg.innerHTML = GiovanniIconDB[k] || GiovanniIconDB.square; },
      remove: () => { btn.remove(); const i = created.indexOf(ref); if (i > -1) created.splice(i, 1); }
    };
    created.push(ref);
    row.appendChild(btn);
    return ref;
  };

  buttons.forEach(b => makeBtn(b));
  group.appendChild(row);
  group.appendChild(title);
  if (container) container.appendChild(group);

  return {
    el: group, row, label, buttons: created,
    createButton: makeBtn,
    destroy: () => { group.remove(); created.length = 0; },
    getButton: (bid) => created.find(b => b.id === bid)
  };
}

createTopMenu({
  buttons = [],
  id = `gio-top-${Math.random().toString(36).slice(2, 8)}`,
  offset = 12,
  gap = 8,
  padding = 8,
  buttonSize = 40,
  iconSize = 20,
  radius = 10,
  bg = 'var(--backg1)',
  border = 'var(--borde)',
  defaultOnClick = null
} = {}) {

  const wrap = document.createElement('div');
  wrap.id = id;
  wrap.style.cssText = `
    position: fixed; top: ${offset}px; left: 50%;
    transform: translateX(-50%);
    display: flex; gap: ${gap}px;
    padding: ${padding}px;
    background: ${bg};
    border: 1px solid ${border};
    border-radius: ${radius}px;
    box-shadow: 0 4px 14px rgba(0,0,0,0.5);
    z-index: 9999;
    max-width: calc(100vw - ${offset * 2}px);
    box-sizing: border-box;
  `;

  const listEl = document.createElement('div');
  listEl.className = 'gio-custom-scroll';
  listEl.style.cssText = `display:flex; gap:${gap}px; overflow-x:auto; overflow-y:hidden; max-width:100%;`;

  const created = [];

  const makeBtn = ({ icon, tooltip = '', bId = null, active = false, onClick = null }) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'gio-btn' + (active ? ' gio-active' : '');
    btn.dataset.tooltip = tooltip;
    if (bId) btn.dataset.id = bId;
    btn.style.width = `${buttonSize}px`;
    btn.style.height = `${buttonSize}px`;
    btn.style.minWidth = `${buttonSize}px`;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.style.width = `${iconSize}px`;
    svg.style.height = `${iconSize}px`;
    svg.innerHTML = GiovanniIconDB[icon] || GiovanniIconDB.square;
    btn.appendChild(svg);

    btn.addEventListener('mouseenter', () => Giovanni._showGlobalTooltip(btn, btn.dataset.tooltip, 'top'));
    btn.addEventListener('mouseleave', () => Giovanni._hideGlobalTooltip());
    btn.addEventListener('focus', () => Giovanni._showGlobalTooltip(btn, btn.dataset.tooltip, 'top'));
    btn.addEventListener('blur', () => Giovanni._hideGlobalTooltip());
    btn.addEventListener('click', (e) => {
      if (typeof onClick === 'function') onClick(btn, e);
      else if (typeof defaultOnClick === 'function') defaultOnClick(btn, e);
    });

    const ref = {
      el: btn, id: bId,
      setActive: (v = true) => btn.classList.toggle('gio-active', v),
      setTooltip: (t) => { btn.dataset.tooltip = t; },
      setIcon: (k) => { svg.innerHTML = GiovanniIconDB[k] || GiovanniIconDB.square; },
      remove: () => { btn.remove(); const i = created.indexOf(ref); if (i > -1) created.splice(i, 1); }
    };
    created.push(ref);
    listEl.appendChild(btn);
    return ref;
  };

  buttons.forEach(b => makeBtn(b));
  wrap.appendChild(listEl);
  document.body.appendChild(wrap);

  return {
    el: wrap, listEl, id, buttons: created,
    createButton: makeBtn,
    show: () => wrap.style.display = '',
    hide: () => wrap.style.display = 'none',
    destroy: () => { wrap.remove(); created.length = 0; },
    getButton: (bid) => created.find(b => b.id === bid)
  };
}

    createSideMenu({
  position = 'left',
  buttons = [],
  id = `gio-menu-${Math.random().toString(36).slice(2, 8)}`,
  collapsible = true,
  defaultCollapsed = false,
  burgerTooltip = 'Mostrar / ocultar menú',
  buttonSize = 44,
  iconSize = 22,
  radius = 10,
  gap = 8,
  padding = 8,
  defaultOnClick = null
} = {}) {

  const menuEl = document.createElement('div');
  menuEl.id = id;
  menuEl.className = `gio-menu gio-${position}`;
  menuEl.style.setProperty('--gio-btn-size',   `${buttonSize}px`);
  menuEl.style.setProperty('--gio-icon-size',  `${iconSize}px`);
  menuEl.style.setProperty('--gio-btn-radius', `${radius}px`);
  menuEl.style.setProperty('--gio-gap',        `${gap}px`);
  menuEl.style.setProperty('--gio-padding',    `${padding}px`);

  const listEl = document.createElement('div');
  listEl.className = 'gio-menu-list gio-custom-scroll';

  const tooltipEl = document.createElement('div');
  tooltipEl.className = 'gio-tooltip';

  let collapsed = false;
  let burgerRef = null;
  const createdButtons = [];

  const createButton = ({ icon, tooltip = '', bId = null, active = false, onClick = null }) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'gio-btn' + (active ? ' gio-active' : '');
    if (bId) btn.dataset.id = bId;
    btn.dataset.tooltip = tooltip;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.innerHTML = GiovanniIconDB[icon] || GiovanniIconDB.square;
    btn.appendChild(svg);

    btn.addEventListener('mouseenter', () => showTooltip(btn, btn.dataset.tooltip));
    btn.addEventListener('mouseleave', hideTooltip);
    btn.addEventListener('focus',      () => showTooltip(btn, btn.dataset.tooltip));
    btn.addEventListener('blur',       hideTooltip);

    btn.addEventListener('click', (e) => {
      if (typeof onClick === 'function') onClick(btn, e);
      else if (typeof defaultOnClick === 'function') defaultOnClick(btn, e);
    });

    const ref = {
      el: btn,
      id: bId,
      setActive: (v = true) => btn.classList.toggle('gio-active', v),
      setTooltip: (t) => { btn.dataset.tooltip = t; },
      setIcon: (key) => { svg.innerHTML = GiovanniIconDB[key] || GiovanniIconDB.square; },
      remove: () => {
        btn.remove();
        const i = createdButtons.indexOf(ref);
        if (i > -1) createdButtons.splice(i, 1);
      }
    };
    createdButtons.push(ref);
    return ref;
  };

 const showTooltip = (target, text) => Giovanni._showGlobalTooltip(target, text, position);
const hideTooltip = () => Giovanni._hideGlobalTooltip();
 

  const collapse = () => {
    if (!collapsible || collapsed) return;
    collapsed = true;
    menuEl.classList.add('gio-collapsed');
    burgerRef?.setIcon('menu');
    hideTooltip();
  };
  const expand = () => {
    if (!collapsible || !collapsed) return;
    collapsed = false;
    menuEl.classList.remove('gio-collapsed');
    burgerRef?.setIcon('menuOpen');
  };
  const toggle = () => collapsed ? expand() : collapse();

  if (collapsible) {
    burgerRef = createButton({
      icon: 'menu',
      tooltip: burgerTooltip,
      bId: '__burger__',
      onClick: () => toggle()
    });
    burgerRef.el.classList.add('gio-burger');
    menuEl.appendChild(burgerRef.el);
  }

  buttons.forEach(b => {
    const ref = createButton(b);
    listEl.appendChild(ref.el);
  });

  menuEl.appendChild(listEl);
  document.body.appendChild(menuEl);
  document.body.appendChild(tooltipEl);

  if (defaultCollapsed) collapse();

  return {
    el: menuEl,
    listEl,
    id,
    buttons: createdButtons,
    createButton,
    toggle,
    collapse,
    expand,
    isCollapsed: () => collapsed,
    setSizes: (s = {}) => {
      if (s.buttonSize) menuEl.style.setProperty('--gio-btn-size',   `${s.buttonSize}px`);
      if (s.iconSize)   menuEl.style.setProperty('--gio-icon-size',  `${s.iconSize}px`);
      if (s.radius)     menuEl.style.setProperty('--gio-btn-radius', `${s.radius}px`);
      if (s.gap != null)menuEl.style.setProperty('--gio-gap',        `${s.gap}px`);
      if (s.padding != null)menuEl.style.setProperty('--gio-padding',`${s.padding}px`);
    },
    show: () => { menuEl.style.display = ''; },
    hide: () => { menuEl.style.display = 'none'; },
    destroy: () => {
      tooltipEl.remove();
      menuEl.remove();
      createdButtons.length = 0;
    },
    getButton: (bId) => createdButtons.find(b => b.id === bId)
  };
}

    createButtonSimple = function({ 
    text = 'TinkerAtlas', 
    onClick = null, 
    fullWidth = false, 
    label = null 
} = {}) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = text;
    btn.style.cssText = `
        background: #2d2d2d;
        color: var(--texto);
        border: 3px solid #2d2d2d0c;
        border-radius: var(--radius);
        padding: 8px 16px;
        font-family: inherit;
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0.5px;
        cursor: pointer;
        outline: none;
        user-select: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: ${fullWidth ? '100%' : 'fit-content'};
        box-sizing: border-box;
        transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
    `;

    // Efecto Hover (Azul Neón + Glow)
    btn.addEventListener('mouseenter', () => {
        btn.style.color = 'var(--textoActvioBlue)';
    
    
 
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.color = 'var(--texto)';
   
        btn.style.background = '#383737';
        btn.style.boxShadow = 'none';
    });

    // Efecto Click (Pulsación)
    btn.addEventListener('mousedown', () => {
        btn.style.transform = 'scale(0.97)';
    });
    btn.addEventListener('mouseup', () => {
        btn.style.transform = 'scale(1)';
    });

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (onClick) onClick(btn, e);
    });

  
    btn.setText = (nuevoTexto) => {
        btn.textContent = nuevoTexto;
        return btn;
    };

 
    if (label) {
        return this._wrapWithLabel(label, btn);
    }

    return btn;
};
createBrowserPanel({
  label = 'Browser',
  data = [],
  width = 260,
  onSelect = null,
  onVisibilityToggle = null,
  onContextMenu = null
} = {}) {

 
  const STYLE_ID = 'gio-browser-styles';
  if (!document.getElementById(STYLE_ID)) {
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .gio-browser {
        background: #11161d;
        border-right: 1px solid #333333c4333;
        display: flex;
        flex-direction: column;
        height: 100%;
        font-family: 'Segoe UI', Roboto, sans-serif;
        font-size: 12px;
        color: #b9c1cc;
        user-select: none;
      }
      .gio-browser-head {
        display: flex; align-items: center; justify-content: space-between;
        padding: 8px 12px;
        border-bottom: 1px solid #333333;
        font-size: 12px; font-weight: 600; color: #e6ebf1;
         background: #333333;
      }
      .gio-browser-head span.small { font-size: 11px; color: #8c93a0; font-weight: 400; }
      .gio-browser-tree {
        flex: 1;
        overflow-y: auto;
        padding: 6px 4px;
        display: flex; flex-direction: column; gap: 1px;
        background: #1e1e1e;
      }
      .gio-browser-row {
        display: flex; align-items: center; gap: 6px;
        padding: 4px 6px;
        border-radius: 4px;
        cursor: pointer;
        transition: background 0.12s;
        border-left: 2px solid transparent;
      }
      .gio-browser-row:hover { background: #1e1e1e; }
      .gio-browser-row.selected { background: #1e2a3a; border-left-color: #4daafc; }
      .gio-browser-chevron {
        width: 12px; height: 12px; flex-shrink: 0;
        display: flex; align-items: center; justify-content: center;
        color: #6c7685;
        transition: transform 0.15s;
      }
      .gio-browser-chevron.open { transform: rotate(90deg); color: #4daafc; }
      .gio-browser-icon {
        width: 14px; height: 14px; flex-shrink: 0;
        fill: currentColor;
        color: #8aa0b8;
      }
      .gio-browser-name {
        flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        font-size: 12px;
      }
      .gio-browser-name.editing { color: #4daafc; font-weight: 600; }
      .gio-browser-eye {
        width: 16px; height: 16px;
        background: transparent; border: none; padding: 0;
        color: #6c7685; cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        opacity: 0.8;
      }
      .gio-browser-eye:hover { color: #4daafc; }
      .gio-browser-eye.off { color: #3a4250; }
    `;
    document.head.appendChild(style);
  }

  // ---------- Estructura ----------
  const root = document.createElement('div');
  root.className = 'gio-browser';
  root.style.width = typeof width === 'number' ? `${width}px` : width;

  const head = document.createElement('div');
  head.className = 'gio-browser-head';
  head.innerHTML = `<span>${label}</span><span class="small">0 bodies</span>`;

  const tree = document.createElement('div');
  tree.className = 'gio-browser-tree gio-custom-scroll';

  root.appendChild(head);
  root.appendChild(tree);

  let state = JSON.parse(JSON.stringify(data));
  let selectedId = null;
  const expanded = new Set();

  // Expande automáticamente los que vienen con open:true
  const seedExpand = (nodes) => {
    nodes.forEach(n => {
      if (n.open) expanded.add(n.id);
      if (n.children) seedExpand(n.children);
    });
  };
  seedExpand(state);

  // ---------- Render ----------
  const render = () => {
    tree.innerHTML = '';

    const build = (items, depth = 0) => {
      items.forEach(item => {
        const row = document.createElement('div');
        row.className = 'gio-browser-row' + (item.id === selectedId ? ' selected' : '');
        row.style.paddingLeft = `${6 + depth * 14}px`;

        const hasChildren = item.children && item.children.length > 0;
        const isOpen = expanded.has(item.id);

        // Chevron
        const chev = document.createElement('div');
        chev.className = 'gio-browser-chevron' + (isOpen ? ' open' : '');
        if (hasChildren) {
          chev.appendChild(Giovanni.getSVG('chevronRight', 10));
          chev.addEventListener('click', (e) => {
            e.stopPropagation();
            isOpen ? expanded.delete(item.id) : expanded.add(item.id);
            render();
          });
        }
        row.appendChild(chev);

        // Icono
        const iconSpan = document.createElement('span');
        iconSpan.className = 'gio-browser-icon';
        iconSpan.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14">${GiovanniIconDB[item.icon] || GiovanniIconDB.square}</svg>`;
        row.appendChild(iconSpan);

        // Nombre
        const name = document.createElement('span');
        name.className = 'gio-browser-name' + (item.editing ? ' editing' : '');
        name.textContent = item.name || item.id;
        row.appendChild(name);

        // Ojo de visibilidad
        const eye = document.createElement('button');
        eye.className = 'gio-browser-eye' + (item.visible === false ? ' off' : '');
        eye.title = item.visible === false ? 'Mostrar' : 'Ocultar';
        eye.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
          ${item.visible === false
            ? '<path d="M12 6a9.77 9.77 0 0 1 8.82 5.5A9.77 9.77 0 0 1 12 17a9.77 9.77 0 0 1-8.82-5.5A9.77 9.77 0 0 1 12 6m0-2C7 4 2.73 7.11 1 12c1.73 4.89 6 8 11 8s9.27-3.11 11-8c-1.73-4.89-6-8-11-8z"/>'
            : '<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5C21.27 7.61 17 4.5 12 4.5zm0 12a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z"/>'}
        </svg>`;
        eye.addEventListener('click', (e) => {
          e.stopPropagation();
          item.visible = item.visible === false ? true : false;
          if (onVisibilityToggle) onVisibilityToggle(item, item.visible);
          render();
        });
        row.appendChild(eye);

        // Click fila
        row.addEventListener('click', () => {
          selectedId = item.id;
          render();
          if (onSelect) onSelect(item);
        });

        // Doble click → editar inline
        row.addEventListener('dblclick', () => {
          startEditInline(name, item);
        });

        // Context menu
        row.addEventListener('contextmenu', (e) => {
          e.preventDefault();
          if (onContextMenu) onContextMenu(e, item);
        });

        tree.appendChild(row);

        if (hasChildren && isOpen) build(item.children, depth + 1);
      });
    };

    build(state);
  };

  // Edición inline del nombre
  const startEditInline = (nameEl, item) => {
    const input = document.createElement('input');
    input.value = item.name;
    input.style.cssText = `
      flex:1; background:#0c1118; border:1px solid #4daafc;
      color:#e6ebf1; font-size:12px; padding:1px 4px;
      border-radius:3px; outline:none;
    `;
    nameEl.replaceWith(input);
    input.focus(); input.select();

    const commit = () => {
      const v = input.value.trim();
      if (v) item.name = v;
      render();
    };
    input.addEventListener('blur', commit);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') input.blur();
      if (e.key === 'Escape') { input.value = item.name; input.blur(); }
    });
  };

  render();

 
  return {
    el: root,
    treeEl: tree,
    getData: () => state,
    setData: (d) => { state = JSON.parse(JSON.stringify(d)); render(); },
    select: (id) => { selectedId = id; render(); },
    expand: (id) => { expanded.add(id); render(); },
    collapse: (id) => { expanded.delete(id); render(); }
  };
}
createUnversalSideMenu({
  position = 'left',
  buttons = [],
  id = `gio-menu-${Math.random().toString(36).slice(2, 8)}`,
  collapsible = true,
  defaultCollapsed = false,
  burgerTooltip = 'Mostrar / ocultar menú',
  buttonSize = 44,
  iconSize = 22,
  radius = 10,
  gap = 8,
  padding = 8,
  defaultOnClick = null
} = {}) {

  const menuEl = document.createElement('div');
  menuEl.id = id;
  menuEl.className = `gio-menu gio-${position}`;
  menuEl.style.setProperty('--gio-btn-size',   `${buttonSize}px`);
  menuEl.style.setProperty('--gio-icon-size',  `${iconSize}px`);
  menuEl.style.setProperty('--gio-btn-radius', `${radius}px`);
  menuEl.style.setProperty('--gio-gap',        `${gap}px`);
  menuEl.style.setProperty('--gio-padding',    `${padding}px`);

  const listEl = document.createElement('div');
  listEl.className = 'gio-menu-list gio-custom-scroll';

  const tooltipEl = document.createElement('div');
  tooltipEl.className = 'gio-tooltip';

  let collapsed = false;
  let burgerRef = null;
  const createdButtons = [];

  const createButton = ({ icon, tooltip = '', bId = null, active = false, onClick = null }) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'gio-btn' + (active ? ' gio-active' : '');
    if (bId) btn.dataset.id = bId;
    btn.dataset.tooltip = tooltip;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.innerHTML = GiovanniIconDB[icon] || GiovanniIconDB.square;
    btn.appendChild(svg);

    btn.addEventListener('mouseenter', () => showTooltip(btn, btn.dataset.tooltip));
    btn.addEventListener('mouseleave', hideTooltip);
    btn.addEventListener('focus',      () => showTooltip(btn, btn.dataset.tooltip));
    btn.addEventListener('blur',       hideTooltip);

    btn.addEventListener('click', (e) => {
      if (typeof onClick === 'function') onClick(btn, e);
      else if (typeof defaultOnClick === 'function') defaultOnClick(btn, e);
    });

    const ref = {
      el: btn,
      id: bId,
      setActive: (v = true) => btn.classList.toggle('gio-active', v),
      setTooltip: (t) => { btn.dataset.tooltip = t; },
      setIcon: (key) => { svg.innerHTML = GiovanniIconDB[key] || GiovanniIconDB.square; },
      remove: () => {
        btn.remove();
        const i = createdButtons.indexOf(ref);
        if (i > -1) createdButtons.splice(i, 1);
      }
    };
    createdButtons.push(ref);
    return ref;
  };

  const showTooltip = (target, text) => {
    if (!text) return;
    tooltipEl.textContent = text;
    tooltipEl.classList.add('gio-visible');

    requestAnimationFrame(() => {
      const r = target.getBoundingClientRect();
      const tw = tooltipEl.offsetWidth;
      const th = tooltipEl.offsetHeight;
      const g = 10;
      let top, left, origin = 'center center';

      switch (position) {
        case 'left':   left = r.right + g; top = r.top + r.height / 2; origin = 'left center'; break;
        case 'right':  left = r.left - tw - g; top = r.top + r.height / 2; origin = 'right center'; break;
        case 'top':    left = r.left + r.width / 2 - tw / 2; top = r.bottom + g + th / 2; break;
        case 'bottom':
        default:       left = r.left + r.width / 2 - tw / 2; top = r.top - g - th / 2; break;
      }

      const m = 6;
      if (left < m) left = m;
      if (left + tw > window.innerWidth - m) left = window.innerWidth - tw - m;
      if (top - th / 2 < m) top = th / 2 + m;
      if (top + th / 2 > window.innerHeight - m) top = window.innerHeight - th / 2 - m;

      tooltipEl.style.left = `${left}px`;
      tooltipEl.style.top  = `${top}px`;
      tooltipEl.style.transformOrigin = origin;
    });
  };
  const hideTooltip = () => tooltipEl.classList.remove('gio-visible');

  const collapse = () => {
    if (!collapsible || collapsed) return;
    collapsed = true;
    menuEl.classList.add('gio-collapsed');
    burgerRef?.setIcon('menu');
    hideTooltip();
  };
  const expand = () => {
    if (!collapsible || !collapsed) return;
    collapsed = false;
    menuEl.classList.remove('gio-collapsed');
    burgerRef?.setIcon('menuOpen');
  };
  const toggle = () => collapsed ? expand() : collapse();

  if (collapsible) {
    burgerRef = createButton({
      icon: 'menu',
      tooltip: burgerTooltip,
      bId: '__burger__',
      onClick: () => toggle()
    });
    burgerRef.el.classList.add('gio-burger');
    menuEl.appendChild(burgerRef.el);
  }

  buttons.forEach(b => {
    const ref = createButton(b);
    listEl.appendChild(ref.el);
  });

  menuEl.appendChild(listEl);
  document.body.appendChild(menuEl);
  document.body.appendChild(tooltipEl);

  if (defaultCollapsed) collapse();

  return {
    el: menuEl,
    listEl,
    id,
    buttons: createdButtons,
    createButton,
    toggle,
    collapse,
    expand,
    isCollapsed: () => collapsed,
    setSizes: (s = {}) => {
      if (s.buttonSize) menuEl.style.setProperty('--gio-btn-size',   `${s.buttonSize}px`);
      if (s.iconSize)   menuEl.style.setProperty('--gio-icon-size',  `${s.iconSize}px`);
      if (s.radius)     menuEl.style.setProperty('--gio-btn-radius', `${s.radius}px`);
      if (s.gap != null)menuEl.style.setProperty('--gio-gap',        `${s.gap}px`);
      if (s.padding != null)menuEl.style.setProperty('--gio-padding',`${s.padding}px`);
    },
    show: () => { menuEl.style.display = ''; },
    hide: () => { menuEl.style.display = 'none'; },
    destroy: () => {
      tooltipEl.remove();
      menuEl.remove();
      createdButtons.length = 0;
    },
    getButton: (bId) => createdButtons.find(b => b.id === bId)
  };
}

    
    createCheckbox(label = 'Habilitar Opción', checked = false, onChange = null) {
        let isChecked = !!checked;

        const container = document.createElement('div');
        container.style.cssText = "display: flex; align-items: center; width: 100%; box-sizing: border-box;";

        const labelWrapper = document.createElement('label');
        labelWrapper.style.cssText = "display: inline-flex; align-items: center; cursor: pointer; user-select: none; gap: 10px;";

        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'checkbox';
        hiddenInput.checked = isChecked;
        hiddenInput.style.display = 'none';

        const box = document.createElement('span');
        box.style.cssText = `
            position: relative;
            width: 18px;
            height: 18px;
            border-radius: 4px;
            background: transparent;
            border: 2px solid var(--textodisable);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            box-sizing: border-box;
            transition: all 0.25s ease;
        `;

        const svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgIcon.setAttribute('viewBox', '0 0 20 20');
        svgIcon.setAttribute('fill', '#ffffff');
        svgIcon.style.cssText = `
            width: 12px;
            height: 12px;
            transform: scale(0);
            transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            display: block;
        `;
        svgIcon.innerHTML = `<path clip-rule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" fill-rule="evenodd"></path>`;
        box.appendChild(svgIcon);

        const textSpan = document.createElement('span');
        textSpan.textContent = label;
        textSpan.style.cssText = "font-size: 13px; color: var(--texto); transition: color 0.2s ease;";

        labelWrapper.addEventListener('mouseenter', () => {
            if (!isChecked) {
                box.style.borderColor = 'var(--textoActvioBlue)';
                textSpan.style.color = 'var(--textoActivo)';
            }
        });
        labelWrapper.addEventListener('mouseleave', () => {
            if (!isChecked) {
                box.style.borderColor = 'var(--textodisable)';
                textSpan.style.color = 'var(--texto)';
            }
        });

        const updateState = (state) => {
            isChecked = state;
            hiddenInput.checked = isChecked;
            if (isChecked) {
                box.style.borderColor = 'var(--textoledBrillo)';
                box.classList.add('gio-led-exacto');
                svgIcon.style.transform = 'scale(1)';
                textSpan.style.color = 'var(--textoActivo)';
            } else {
                box.style.borderColor = 'var(--textodisable)';
                box.style.background = 'transparent';
                box.classList.remove('gio-led-exacto');
                svgIcon.style.transform = 'scale(0)';
                textSpan.style.color = 'var(--texto)';
            }
        };

        updateState(isChecked);

        labelWrapper.addEventListener('click', (e) => {
            e.preventDefault();
            updateState(!isChecked);
            if (onChange) onChange(isChecked);
        });

        labelWrapper.appendChild(hiddenInput);
        labelWrapper.appendChild(box);
        labelWrapper.appendChild(textSpan);
        container.appendChild(labelWrapper);

        return this._wrapWithLabel('Checkbox', container);
    }

    /* =========================================================================
       2. RADIO BUTTONS CON EMISIÓN LED EXACTA (18x18px)
       ========================================================================= */
    createRadio(options = [], name = 'gio_radio', selectedValue = null, onChange = null) {
        let currentVal = selectedValue !== null ? selectedValue : options[0];

        const container = document.createElement('div');
        container.style.cssText = "display: flex; flex-direction: column; gap: 8px; width: 100%; box-sizing: border-box;";

        const radioElements = [];

        options.forEach(opt => {
            const labelText = typeof opt === 'object' ? opt.label : opt;
            const val = typeof opt === 'object' ? opt.value : opt;

            const item = document.createElement('div');
            item.style.cssText = "display: flex; align-items: center; gap: 10px; cursor: pointer; user-select: none; width: fit-content;";

            const circle = document.createElement('div');
            circle.style.cssText = `
                width: 18px;
                height: 18px;
                border-radius: 50%;
                background: transparent;
                border: 2px solid var(--textodisable);
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                transition: border-color 0.2s;
            `;

            const dot = document.createElement('div');
            dot.style.cssText = `
                width: 8px;
                height: 8px;
                border-radius: 50%;
                transform: scale(0);
                transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            `;
            circle.appendChild(dot);

            const txt = document.createElement('span');
            txt.textContent = labelText;
            txt.style.cssText = "font-size: 13px; color: var(--texto);";

            item.appendChild(circle);
            item.appendChild(txt);
            container.appendChild(item);

            radioElements.push({ val, circle, dot, txt });

            item.addEventListener('click', () => {
                currentVal = val;
                refreshUI();
                if (onChange) onChange(currentVal);
            });
        });

        const refreshUI = () => {
            radioElements.forEach(r => {
                const isActive = r.val === currentVal;
                if (isActive) {
                    r.circle.style.borderColor = "var(--textoActvioBlue)";
                    r.dot.style.transform = "scale(1)";
                    r.dot.classList.add('gio-led-exacto');
                    r.txt.style.color = "var(--textoActivo)";
                } else {
                    r.circle.style.borderColor = "var(--textodisable)";
                    r.dot.style.transform = "scale(0)";
                    r.dot.classList.remove('gio-led-exacto');
                    r.txt.style.color = "var(--texto)";
                }
            });
        };

        refreshUI();
        return this._wrapWithLabel('Selección Exclusiva', container);
    }

    /* =========================================================================
       3. TOGGLE SWITCH CON EMISIÓN LED EXACTA
       ========================================================================= */
    createToggle(label = 'Interruptor', checked = false, onChange = null) {
        let isChecked = !!checked;

        const wrap = document.createElement('div');
        wrap.style.cssText = "display: flex; align-items: center; justify-content: space-between; gap: 10px; cursor: pointer; user-select: none; width: 100%; box-sizing: border-box;";

        const lbl = document.createElement('span');
        lbl.textContent = label;
        lbl.style.cssText = "font-size: 13px; color: var(--texto); flex: 1;";

        const switchBg = document.createElement('div');
        switchBg.style.cssText = "width: 36px; height: 20px; border-radius: 20px; background: var(--backg0); border: 1px solid var(--borde); position: relative; flex-shrink: 0; transition: all 0.25s ease;";

        const thumb = document.createElement('div');
        thumb.style.cssText = `
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: var(--textodisable);
            position: absolute;
            top: 2px;
            left: 2px;
            transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        `;
        switchBg.appendChild(thumb);

        const updateState = (state) => {
            if (state) {
                thumb.style.transform = "translateX(16px)";
                thumb.classList.add('gio-led-exacto');
                switchBg.style.borderColor = "var(--textoActvioBlue)";
                lbl.style.color = "var(--textoActivo)";
            } else {
                thumb.style.transform = "translateX(0px)";
                thumb.classList.remove('gio-led-exacto');
                thumb.style.background = "var(--textodisable)";
                switchBg.style.borderColor = "var(--borde)";
                lbl.style.color = "var(--texto)";
            }
        };

        updateState(isChecked);

        wrap.addEventListener('click', () => {
            isChecked = !isChecked;
            updateState(isChecked);
            if (onChange) onChange(isChecked);
        });

        wrap.appendChild(lbl);
        wrap.appendChild(switchBg);

        return this._wrapWithLabel('Estado', wrap);
    }

    /* =========================================================================
       4. SLIDER CON CAJÓN DESPLEGABLE
       ========================================================================= */
    createSlider({ label = 'Control Deslizante', min = 0, max = 100, step = 1, value = 50, onChange = null } = {}) {
        let curMin = Number(min);
        let curMax = Number(max);
        let curStep = Number(step);
        let curVal = Math.max(curMin, Math.min(curMax, Number(value)));

        const card = document.createElement('div');
        card.style.cssText = "display: flex; flex-direction: column; gap: 8px; box-sizing: border-box; width: 100%; user-select: none;";

        const header = document.createElement('div');
        header.style.cssText = "display: flex; align-items: center; justify-content: space-between; gap: 8px; width: 100%;";

        const title = document.createElement('span');
        title.textContent = label;
        title.style.cssText = "font-size: 12px; font-weight: 500; color: var(--texto); flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;";

        const rightTools = document.createElement('div');
        rightTools.style.cssText = "display: flex; align-items: center; gap: 6px; flex-shrink: 0;";

        const badge = document.createElement('span');
        badge.textContent = curVal;
        badge.style.cssText = "font-size: 11px; font-family: monospace; color: var(--textoActivo); background: var(--backg3); padding: 2px 8px; border-radius: 4px; border: 1px solid var(--borde);";

        const btnCajon = document.createElement('button');
        btnCajon.innerHTML = `<svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><polyline points="1 1 5 5 9 1"></polyline></svg>`;
        btnCajon.style.cssText = "width: 22px; height: 22px; border: 1px solid transparent; background: transparent; color: var(--textodisable); cursor: pointer; display: flex; align-items: center; justify-content: center; border-radius: 4px; transition: all 0.2s;";

        rightTools.appendChild(badge);
        rightTools.appendChild(btnCajon);
        header.appendChild(title);
        header.appendChild(rightTools);

        const trackWrap = document.createElement('div');
        trackWrap.style.cssText = "width: 100%; height: 18px; display: flex; align-items: center; cursor: pointer; position: relative;";

        const trackBar = document.createElement('div');
        trackBar.style.cssText = "width: 100%; height: 4px; background: var(--slidernofill); border-radius: 2px; position: relative; pointer-events: none;";

        const fillBar = document.createElement('div');
        fillBar.style.cssText = "position: absolute; left: 0; top: 0; height: 100%; background: var(--sliderfill); border-radius: 2px; width: 0%; pointer-events: none;";

        const thumb = document.createElement('div');
        thumb.style.cssText = "position: absolute; top: 50%; transform: translate(-50%, -50%); width: 13px; height: 13px; border-radius: 50%; background: var(--backg); border: 2.5px solid #ffffff86; box-shadow: 0 1px 4px rgba(0,0,0,0.6); pointer-events: none; transition: transform 0.1s;";

        trackBar.appendChild(fillBar);
        trackBar.appendChild(thumb);
        trackWrap.appendChild(trackBar);

        const cajon = document.createElement('div');
        cajon.style.cssText = "display: none; grid-template-columns: repeat(4, 1fr); gap: 6px; padding-top: 8px; border-top: 1px solid var(--borde); width: 100%; box-sizing: border-box; animation: gioFadeIn 0.2s ease-out;";

        const createCajonInput = (name, initialVal, onValChange) => {
            const col = document.createElement('div');
            col.style.cssText = "display: flex; flex-direction: column; gap: 2px;";
            const tag = document.createElement('span');
            tag.textContent = name;
            tag.style.cssText = "font-size: 10px; color: var(--textodisable); text-transform: uppercase;";

            const inp = document.createElement('input');
            inp.type = 'number';
            inp.value = initialVal;
            inp.style.cssText = "width: 100%; height: 24px; text-align: center; background: var(--backg3); border: 1px solid var(--borde); color: #fff; font-size: 11px; border-radius: 4px; outline: none;";
            inp.addEventListener('change', () => onValChange(parseFloat(inp.value)));

            col.appendChild(tag);
            col.appendChild(inp);
            return { col, inp };
        };

        const updateVisuals = (val) => {
            curVal = Number(val);
            badge.textContent = curVal;
            const pct = curMax > curMin ? Math.min(100, Math.max(0, ((curVal - curMin) / (curMax - curMin)) * 100)) : 0;
            fillBar.style.width = `${pct}%`;
            thumb.style.left = `${pct}%`;
        };

        const handleDrag = (e) => {
            const cx = e.touches ? e.touches[0].clientX : e.clientX;
            const r = trackBar.getBoundingClientRect();
            let ratio = (cx - r.left) / r.width;
            ratio = Math.max(0, Math.min(1, ratio));

            let raw = curMin + ratio * (curMax - curMin);
            const steps = Math.round((raw - curMin) / curStep);
            let calculated = Number((curMin + steps * curStep).toFixed(2));
            calculated = Math.max(curMin, Math.min(curMax, calculated));

            updateVisuals(calculated);
            inpExact.inp.value = calculated;
            if (onChange) onChange(calculated);
        };

        const stopDrag = () => {
            thumb.style.transform = "translate(-50%, -50%) scale(1)";
            window.removeEventListener('mousemove', handleDrag);
            window.removeEventListener('mouseup', stopDrag);
            window.removeEventListener('touchmove', handleDrag);
            window.removeEventListener('touchend', stopDrag);
        };

        const startDrag = (e) => {
            e.stopPropagation();
            if (e.cancelable) e.preventDefault();
            thumb.style.transform = "translate(-50%, -50%) scale(1.2)";
            handleDrag(e);
            window.addEventListener('mousemove', handleDrag);
            window.addEventListener('mouseup', stopDrag);
            window.addEventListener('touchmove', handleDrag, { passive: false });
            window.addEventListener('touchend', stopDrag);
        };

        trackWrap.addEventListener('mousedown', startDrag);
        trackWrap.addEventListener('touchstart', startDrag, { passive: false });

        let isOpen = false;
        btnCajon.addEventListener('click', (e) => {
            e.stopPropagation();
            isOpen = !isOpen;
            cajon.style.display = isOpen ? 'grid' : 'none';
            btnCajon.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
            btnCajon.style.color = isOpen ? 'var(--textoledBrillo)' : 'var(--textodisable)';
        });

        const inpMin = createCajonInput('Mín', curMin, (v) => { if (!isNaN(v)) { curMin = v; updateVisuals(curVal); } });
        const inpMax = createCajonInput('Máx', curMax, (v) => { if (!isNaN(v)) { curMax = v; updateVisuals(curVal); } });
        const inpStep = createCajonInput('Paso', curStep, (v) => { if (!isNaN(v) && v > 0) curStep = v; });
        const inpExact = createCajonInput('Val', curVal, (v) => {
            if (!isNaN(v)) {
                updateVisuals(Math.max(curMin, Math.min(curMax, v)));
                if (onChange) onChange(curVal);
            }
        });

        cajon.appendChild(inpMin.col);
        cajon.appendChild(inpMax.col);
        cajon.appendChild(inpStep.col);
        cajon.appendChild(inpExact.col);

        card.appendChild(header);
        card.appendChild(trackWrap);
        card.appendChild(cajon);

        updateVisuals(curVal);
        return this._wrapWithLabel('Ajuste Numérico', card);
    }

    /* =========================================================================
       5. SELECTOR CON BUSCADOR
       ========================================================================= */
    createSelectSearch(options = [], selected = null, onChange = null) {
        const normalized = options.map(o => typeof o === 'object' ? o : { value: o, label: String(o) });
        let currentVal = selected !== null ? selected : (normalized[0]?.value ?? '');

        const wrap = document.createElement('div');
        wrap.style.cssText = "position: relative; width: 100%; box-sizing: border-box; user-select: none;";

        const trigger = document.createElement('div');
        trigger.tabIndex = 0;
        trigger.style.cssText = "width: 100%; height: 34px; background: var(--backg0); border: 1px solid var(--borde); border-radius: var(--radius); padding: 0 12px; display: flex; align-items: center; justify-content: space-between; cursor: pointer; box-sizing: border-box; transition: all 0.2s;";

        const labelText = document.createElement('span');
        labelText.style.cssText = "font-size: 13px; color: var(--textoActivo); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;";

        const arrow = document.createElement('div');
        arrow.innerHTML = `<svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><polyline points="1 1 5 5 9 1"></polyline></svg>`;
        arrow.style.cssText = "transition: transform 0.2s; display: flex; align-items: center; color: var(--textodisable);";

        trigger.appendChild(labelText);
        trigger.appendChild(arrow);

        const menu = document.createElement('div');
        menu.style.cssText = "position: absolute; top: calc(100% + 5px); left: 0; width: 100%; background: var(--backg1); border: 1px solid var(--borde); border-radius: var(--radius); box-shadow: 0 10px 28px rgba(0,0,0,0.7); z-index: 1000; display: none; flex-direction: column; padding: 6px; box-sizing: border-box; animation: gioFadeIn 0.15s ease-out;";

        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Buscar...';
        searchInput.style.cssText = "width: 100%; height: 28px; background: var(--backg3); border: 1px solid var(--borde); border-radius: 4px; padding: 0 8px; color: #fff; font-size: 12px; outline: none; box-sizing: border-box; margin-bottom: 4px;";

        const itemsWrap = document.createElement('div');
        itemsWrap.className = 'gio-custom-scroll';
        itemsWrap.style.cssText = "overflow-y: auto; display: flex; flex-direction: column; gap: 2px;";

        menu.appendChild(searchInput);
        menu.appendChild(itemsWrap);
        wrap.appendChild(trigger);
        wrap.appendChild(menu);

        let isOpen = false;

        const renderList = (filter = '') => {
            itemsWrap.innerHTML = '';
            const search = filter.toLowerCase().trim();
            const filtered = normalized.filter(o => o.label.toLowerCase().includes(search));

            if (filtered.length >= 8) itemsWrap.style.maxHeight = '240px';
            else itemsWrap.style.maxHeight = 'none';

            if (filtered.length === 0) {
                const empty = document.createElement('div');
                empty.textContent = 'Sin resultados';
                empty.style.cssText = "padding: 8px; font-size: 12px; color: var(--textodisable); text-align: center;";
                itemsWrap.appendChild(empty);
                return;
            }

            filtered.forEach(opt => {
                const isSelected = opt.value === currentVal;
                const row = document.createElement('div');
                row.style.cssText = `padding: 7px 10px; font-size: 12px; border-radius: 4px; cursor: pointer; display: flex; align-items: center; justify-content: space-between; color: ${isSelected ? 'var(--textoledBrillo)' : 'var(--texto)'}; background: ${isSelected ? 'rgba(77, 170, 252, 0.15)' : 'transparent'}; font-weight: ${isSelected ? '600' : '400'};`;

                row.textContent = opt.label;
                if (isSelected) {
                    const check = document.createElement('span');
                    check.innerHTML = '✓';
                    check.style.fontSize = '12px';
                    row.appendChild(check);
                }

                row.addEventListener('mouseenter', () => { if (!isSelected) row.style.background = 'var(--backg2)'; });
                row.addEventListener('mouseleave', () => { if (!isSelected) row.style.background = 'transparent'; });

                row.addEventListener('click', (e) => {
                    e.stopPropagation();
                    currentVal = opt.value;
                    labelText.textContent = opt.label;
                    closeDropdown();
                    if (onChange) onChange(currentVal);
                });

                itemsWrap.appendChild(row);
            });
        };

        const openDropdown = () => {
            isOpen = true;
            menu.style.display = 'flex';
            trigger.style.borderColor = 'var(--textoActvioBlue)';
            arrow.style.transform = 'rotate(180deg)';
            renderList();
            setTimeout(() => searchInput.focus(), 50);
        };

        const closeDropdown = () => {
            isOpen = false;
            menu.style.display = 'none';
            trigger.style.borderColor = 'var(--borde)';
            arrow.style.transform = 'rotate(0deg)';
            searchInput.value = '';
        };

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            isOpen ? closeDropdown() : openDropdown();
        });

        searchInput.addEventListener('click', (e) => e.stopPropagation());
        searchInput.addEventListener('input', (e) => renderList(e.target.value));

        document.addEventListener('click', (e) => {
            if (!wrap.contains(e.target)) closeDropdown();
        });

        const initItem = normalized.find(o => o.value === currentVal);
        labelText.textContent = initItem ? initItem.label : (normalized[0]?.label ?? '');

        return this._wrapWithLabel('Selector Desplegable', wrap);
    }

    /* =========================================================================
       6. TABLA DINÁMICA CON REORDENAMIENTO INTERNO Y DRAG EXTERNO
       ========================================================================= */
    createTable({ label = 'Tabla de Datos', columns = [], data = [], endpoint = null, pageSize = 5, onRowDelete = null, onRowClick = null } = {}) {
        const container = document.createElement('div');
        container.style.cssText = "display: flex; flex-direction: column; gap: 6px; width: 100%; box-sizing: border-box; overflow: hidden;";

        let cols = [...columns];
        let originalData = [...data];
        let displayData = [...data];
        let currentPage = 1;
        let query = '';
        let dragColIdx = null;

        const toolbar = document.createElement('div');
        toolbar.style.cssText = "display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 6px 8px; background: var(--backg2); border-bottom: 1px solid var(--borde); border-radius: 4px 4px 0 0;";

        const search = document.createElement('input');
        search.type = 'text';
        search.placeholder = 'Buscar en tabla...';
        search.style.cssText = "flex: 1; height: 26px; border-radius: 4px; border: 1px solid var(--borde); background: var(--backg3); color: #fff; padding: 0 8px; font-size: 11px; outline: none;";

        const btnRefresh = document.createElement('button');
        btnRefresh.innerHTML = '↻';
        btnRefresh.style.cssText = "width: 26px; height: 26px; border-radius: 4px; border: 1px solid var(--borde); background: var(--backg0); color: var(--texto); cursor: pointer; display: flex; align-items: center; justify-content: center;";

        toolbar.appendChild(search);
        toolbar.appendChild(btnRefresh);

        const scrollBox = document.createElement('div');
        scrollBox.className = 'gio-custom-scroll';
        scrollBox.style.cssText = "width: 100%; overflow-x: auto;";

        const table = document.createElement('table');
        table.style.cssText = "width: 100%; border-collapse: collapse; text-align: left; font-size: 12px;";

        const thead = document.createElement('thead');
        const theadTr = document.createElement('tr');
        thead.appendChild(theadTr);

        const tbody = document.createElement('tbody');
        table.appendChild(thead);
        table.appendChild(tbody);
        scrollBox.appendChild(table);

        const footer = document.createElement('div');
        footer.style.cssText = "display: flex; align-items: center; justify-content: space-between; padding: 6px 8px; background: var(--backg2); border-top: 1px solid var(--borde); font-size: 11px; color: var(--textodisable); border-radius: 0 0 4px 4px;";

        const info = document.createElement('span');
        const pager = document.createElement('div');
        pager.style.cssText = "display: flex; align-items: center; gap: 4px;";

        const btnPrev = document.createElement('button');
        btnPrev.textContent = '◀';
        btnPrev.style.cssText = "background: transparent; border: 1px solid var(--borde); color: #fff; border-radius: 4px; padding: 2px 6px; cursor: pointer;";

        const pageText = document.createElement('span');
        pageText.style.cssText = "color: #fff; font-family: monospace; padding: 0 4px;";

        const btnNext = document.createElement('button');
        btnNext.textContent = '▶';
        btnNext.style.cssText = "background: transparent; border: 1px solid var(--borde); color: #fff; border-radius: 4px; padding: 2px 6px; cursor: pointer;";

        pager.appendChild(btnPrev);
        pager.appendChild(pageText);
        pager.appendChild(btnNext);
        footer.appendChild(info);
        footer.appendChild(pager);

        const applyFilter = () => {
            if (!query) displayData = [...originalData];
            else {
                displayData = originalData.filter(row =>
                    cols.some(col => String(row[col.key] !== undefined ? row[col.key] : '').toLowerCase().includes(query))
                );
            }
            renderTable();
        };

        const renderHeaders = () => {
            theadTr.innerHTML = '';
            cols.forEach((col, idx) => {
                const th = document.createElement('th');
                th.textContent = col.label || col.key;
                th.draggable = true;
                th.style.cssText = "background: var(--backg0); color: var(--texto); padding: 7px 10px; border-bottom: 1px solid var(--borde); font-weight: 600; white-space: nowrap; cursor: grab;";

                th.addEventListener('dragstart', (e) => { e.stopPropagation(); dragColIdx = idx; });
                th.addEventListener('dragover', (e) => e.preventDefault());
                th.addEventListener('drop', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (dragColIdx !== null && dragColIdx !== idx) {
                        const moved = cols.splice(dragColIdx, 1)[0];
                        cols.splice(idx, 0, moved);
                        renderTable();
                    }
                    dragColIdx = null;
                });

                theadTr.appendChild(th);
            });

            const thDel = document.createElement('th');
            thDel.textContent = '✕';
            thDel.style.cssText = "background: var(--backg0); width: 28px; text-align: center; border-bottom: 1px solid var(--borde); color: var(--textodisable);";
            theadTr.appendChild(thDel);
        };

        const renderTable = () => {
            renderHeaders();
            tbody.innerHTML = '';

            const totalPages = Math.ceil(displayData.length / pageSize) || 1;
            currentPage = Math.min(currentPage, totalPages);
            const start = (currentPage - 1) * pageSize;
            const slice = displayData.slice(start, start + pageSize);

            info.textContent = `${displayData.length} filas`;
            pageText.textContent = `${currentPage}/${totalPages}`;
            btnPrev.disabled = currentPage <= 1;
            btnNext.disabled = currentPage >= totalPages;

            if (slice.length === 0) {
                const tr = document.createElement('tr');
                const td = document.createElement('td');
                td.colSpan = cols.length + 1;
                td.textContent = 'Sin datos';
                td.style.cssText = "text-align: center; padding: 12px; color: var(--textodisable);";
                tr.appendChild(td);
                tbody.appendChild(tr);
                return;
            }

            slice.forEach((row, rIdx) => {
                const tr = document.createElement('tr');
                tr.style.cssText = "border-bottom: 1px solid var(--borde); transition: background 0.15s;";
                tr.addEventListener('mouseenter', () => tr.style.background = 'var(--backg2)');
                tr.addEventListener('mouseleave', () => tr.style.background = 'transparent');

                if (onRowClick) {
                    tr.style.cursor = 'pointer';
                    tr.addEventListener('click', (e) => {
                        if (!e.target.closest('button')) onRowClick(row, start + rIdx);
                    });
                }

                cols.forEach(col => {
                    const td = document.createElement('td');
                    td.style.cssText = "padding: 7px 10px; color: var(--texto); white-space: nowrap;";
                    td.textContent = row[col.key] !== undefined ? row[col.key] : '';
                    tr.appendChild(td);
                });

                const tdAction = document.createElement('td');
                tdAction.style.cssText = "text-align: center; padding: 4px;";
                const btnDel = document.createElement('button');
                btnDel.innerHTML = '✕';
                btnDel.style.cssText = "background: transparent; border: 1px solid var(--borde); color: var(--danger); border-radius: 4px; width: 22px; height: 22px; cursor: pointer;";

                btnDel.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const idx = originalData.indexOf(row);
                    if (idx !== -1) originalData.splice(idx, 1);
                    if (onRowDelete) onRowDelete(row, idx);
                    applyFilter();
                });

                tdAction.appendChild(btnDel);
                tr.appendChild(tdAction);
                tbody.appendChild(tr);
            });
        };

        search.addEventListener('input', (e) => {
            query = e.target.value.toLowerCase();
            currentPage = 1;
            applyFilter();
        });

        btnPrev.addEventListener('click', () => { if (currentPage > 1) { currentPage--; renderTable(); } });
        btnNext.addEventListener('click', () => {
            const total = Math.ceil(displayData.length / pageSize) || 1;
            if (currentPage < total) { currentPage++; renderTable(); }
        });

        btnRefresh.addEventListener('click', () => {
            if (endpoint) {
                fetch(endpoint).then(r => r.json()).then(j => {
                    originalData = Array.isArray(j) ? j : (j.data || []);
                    applyFilter();
                });
            } else renderTable();
        });

        container.appendChild(toolbar);
        container.appendChild(scrollBox);
        container.appendChild(footer);

        applyFilter();
        return this._wrapWithLabel(label, container);
    }

    getElement() {
        return this.element;
    }
}

 

Giovanni.getSVG = function(keyOrPath, size = 18) {
    const pathData = GiovanniIconDB[keyOrPath] || keyOrPath;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    svg.setAttribute('fill', 'currentColor');
    svg.style.pointerEvents = 'none';
    svg.innerHTML = pathData.startsWith('<') ? pathData : `<path d="${pathData}"/>`;
    return svg;
};

Giovanni.prototype.createIconButton = function({ icon = 'square', active = false, onClick = null, title = '' } = {}) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.title = title;
    btn.style.cssText = `
        width: 35px;
        height: 35px;
        min-width: 35px;
        min-height: 35px;
        border-radius: 10px;
        background: var(--backg1);
        border: 1px solid var(--borde);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: var(--texto);
        transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
        box-sizing: border-box;
        padding: 0;
        outline: none;
        user-select: none;
    `;

    let currentIcon = icon;
    let svgElement = Giovanni.getSVG(currentIcon, 18);
    btn.appendChild(svgElement);

    const setActiveStyle = (st) => {
        if (st) {
            btn.style.background = 'rgba(77, 170, 252, 0.15)';
            btn.style.borderColor = 'var(--textoActvioBlue)';
            btn.style.color = 'var(--textoActvioBlue)';
            btn.style.boxShadow = '0 0 10px rgba(77, 170, 252, 0.3)';
        } else {
            btn.style.background = 'var(--backg1)';
            btn.style.borderColor = 'var(--borde)';
            btn.style.color = 'var(--texto)';
            btn.style.boxShadow = 'none';
        }
    };
    setActiveStyle(active);

    btn.addEventListener('mouseenter', () => {
        if (!btn.dataset.active) {
            btn.style.borderColor = 'var(--textoActvioBlue)';
            btn.style.color = 'var(--textoActivo)';
            btn.style.background = '#363636';
        }
    });

    btn.addEventListener('mouseleave', () => {
        if (!btn.dataset.active) {
            btn.style.borderColor = 'var(--borde)';
            btn.style.color = 'var(--texto)';
            btn.style.background = 'var(--backg1)';
        }
    });

    btn.setIcon = (newIconKeyOrSvg) => {
        currentIcon = newIconKeyOrSvg;
        btn.innerHTML = '';
        svgElement = Giovanni.getSVG(currentIcon, 18);
        btn.appendChild(svgElement);
        return btn;
    };

    btn.setActive = (state) => {
        btn.dataset.active = state ? 'true' : '';
        setActiveStyle(state);
        return btn;
    };

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (onClick) onClick(btn, currentIcon);
    });

    return btn;
};

Giovanni.prototype.createIconToolbar = function(buttons = []) {
    const bar = document.createElement('div');
    bar.style.cssText = "display: flex; align-items: center; gap: 8px; flex-wrap: wrap; width: 100%; box-sizing: border-box;";

    buttons.forEach(cfg => {
        const b = this.createIconButton(cfg);
        bar.appendChild(b);
    });

    return this._wrapWithLabel('Herramientas Rápidas', bar);
};

Giovanni.prototype.createNodeTree = function({
    label = 'Árbol de Escena / Capas',
    data = [],
    onSelect = null,
    onReorder = null,
    onIconChange = null,
    onVisibilityChange = null
} = {}) {
    const treeRoot = document.createElement('div');
    treeRoot.tabIndex = 0;
    treeRoot.className = 'gio-custom-scroll';
    treeRoot.style.cssText = `
        max-height: 280px;
        overflow-y: auto;
        padding: 4px;
        border-radius: var(--radius);
        background: var(--backg3);
        border: 1px solid var(--borde);
        display: flex;
        flex-direction: column;
        gap: 2px;
        width: 100%;
        box-sizing: border-box;
        outline: none;
        user-select: none;
    `;

    let nodes = JSON.parse(JSON.stringify(data));
    let selectedNodeId = nodes[0]?.id || null;
    let dragSourceId = null;

    const findNode = (id, list = nodes) => {
        for (const n of list) {
            if (n.id === id) return { node: n, parentList: list };
            if (n.children) {
                const r = findNode(id, n.children);
                if (r) return r;
            }
        }
        return null;
    };

    const renderTree = () => {
        treeRoot.innerHTML = '';

        const buildBranch = (items, depth = 0) => {
            items.forEach((item) => {
                const isSelected = item.id === selectedNodeId;

                const row = document.createElement('div');
                row.draggable = true;
                row.dataset.id = item.id;
                row.style.cssText = `
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 4px 6px;
                    padding-left: ${depth * 18 + 6}px;
                    border-radius: 6px;
                    background: ${isSelected ? 'rgba(77, 170, 252, 0.16)' : 'transparent'};
                    border-left: 2px solid ${isSelected ? 'var(--textoActvioBlue)' : 'transparent'};
                    cursor: pointer;
                    transition: background 0.15s;
                    box-sizing: border-box;
                `;

                row.addEventListener('mouseenter', () => {
                    if (item.id !== selectedNodeId) row.style.background = 'var(--backg2)';
                });
                row.addEventListener('mouseleave', () => {
                    if (item.id !== selectedNodeId) row.style.background = 'transparent';
                });

                const chevron = document.createElement('div');
                chevron.style.cssText = `
                    width: 16px;
                    height: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: ${item.open ? 'var(--textoActvioBlue)' : 'var(--textodisable)'};
                    transform: rotate(${item.open ? '90deg' : '0deg'});
                    transition: transform 0.2s, color 0.2s;
                    flex-shrink: 0;
                `;

                if (item.children && item.children.length > 0) {
                    chevron.appendChild(Giovanni.getSVG('chevronRight', 12));
                    chevron.addEventListener('click', (e) => {
                        e.stopPropagation();
                        item.open = !item.open;
                        renderTree();
                    });
                }
                row.appendChild(chevron);

                const iconBtn = this.createIconButton({
                    icon: item.icon || 'square',
                    onClick: (btn) => {
                        const iconKeys = Object.keys(GiovanniIconDB);
                        const nextIcon = iconKeys[(iconKeys.indexOf(item.icon) + 1) % iconKeys.length] || 'square';
                        item.icon = nextIcon;
                        btn.setIcon(nextIcon);
                        if (onIconChange) onIconChange(item, nextIcon);
                    }
                });
                row.appendChild(iconBtn);

                const labelSpan = document.createElement('span');
                labelSpan.textContent = item.name || item.id;
                labelSpan.style.cssText = `
                    font-size: 12px;
                    color: ${isSelected ? 'var(--textoActivo)' : 'var(--texto)'};
                    font-weight: ${isSelected ? '600' : '400'};
                    flex: 1;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                `;
                row.appendChild(labelSpan);

                const visBtn = document.createElement('button');
                visBtn.type = 'button';
                visBtn.style.cssText = `
                    width: 28px;
                    height: 28px;
                    min-width: 28px;
                    min-height: 28px;
                    border-radius: 6px;
                    border: none;
                    background: transparent;
                    color: ${item.visible !== false ? 'var(--textoActvioBlue)' : 'var(--textodisable)'};
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                `;
                visBtn.appendChild(Giovanni.getSVG(item.visible !== false ? 'check' : 'close', 14));

                visBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    item.visible = item.visible === false ? true : false;
                    if (onVisibilityChange) onVisibilityChange(item, item.visible);
                    renderTree();
                });
                row.appendChild(visBtn);

                row.addEventListener('click', () => {
                    selectedNodeId = item.id;
                    renderTree();  
                    if (onSelect) onSelect(item);
                });

                row.addEventListener('dragstart', (e) => {
                    e.stopPropagation();
                    dragSourceId = item.id;
                });

                row.addEventListener('dragover', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const r = row.getBoundingClientRect();
                    const isTop = e.clientY < r.top + r.height / 2;
                    row.style.borderTop = isTop ? '2px solid var(--textoActvioBlue)' : 'none';
                    row.style.borderBottom = !isTop ? '2px solid var(--textoActvioBlue)' : 'none';
                });

                row.addEventListener('dragleave', () => {
                    row.style.borderTop = 'none';
                    row.style.borderBottom = 'none';
                });

                row.addEventListener('drop', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    row.style.borderTop = 'none';
                    row.style.borderBottom = 'none';

                    if (!dragSourceId || dragSourceId === item.id) return;

                    const src = findNode(dragSourceId);
                    const dst = findNode(item.id);

                    if (src && dst) {
                        const [moved] = src.parentList.splice(src.parentList.indexOf(src.node), 1);
                        const r = row.getBoundingClientRect();
                        const insertIndex = e.clientY < r.top + r.height / 2 
                            ? dst.parentList.indexOf(dst.node) 
                            : dst.parentList.indexOf(dst.node) + 1;

                        dst.parentList.splice(insertIndex, 0, moved);
                        selectedNodeId = moved.id;
                        renderTree();
                        if (onReorder) onReorder(nodes, moved, dst.node);
                    }
                    dragSourceId = null;
                });

                treeRoot.appendChild(row);

                if (item.open && item.children && item.children.length > 0) {
                    buildBranch(item.children, depth + 1);
                }
            });
        };

        buildBranch(nodes);
    };

    const moveNodeDirection = (dir) => {
        if (!selectedNodeId) return;
        const res = findNode(selectedNodeId);
        if (!res) return;

        const { node, parentList } = res;
        const idx = parentList.indexOf(node);
        const targetIdx = idx + dir;

        if (targetIdx >= 0 && targetIdx < parentList.length) {
            parentList.splice(idx, 1);
            parentList.splice(targetIdx, 0, node);
            renderTree();
            if (onReorder) onReorder(nodes, node, parentList[targetIdx]);
        }
    };

    treeRoot.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'ArrowUp') {
            e.preventDefault();
            moveNodeDirection(-1);
        } else if (e.ctrlKey && e.key === 'ArrowDown') {
            e.preventDefault();
            moveNodeDirection(1);
        }
    });

    renderTree();

    const field = this._wrapWithLabel(label, treeRoot);
    field.getTreeData = () => nodes;
    field.setTreeData = (newData) => { nodes = newData; renderTree(); };
    return field;
};


 
