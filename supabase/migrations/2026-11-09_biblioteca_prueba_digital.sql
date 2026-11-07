-- ═════════════════════════════════════════════════════════════
-- Migración 2026-11-09 — Biblioteca del curso «Prueba Digital para Abogados»
-- Material del curso, normas colombianas, jurisprudencia, referentes internacionales y guías
-- técnicas. Todos los enlaces fueron revisados el 7 de noviembre de 2026.
-- Correr completa en Supabase → SQL Editor (copiar todo con Cmd + A). Es idempotente:
-- si se corre dos veces no duplica nada. No modifica progreso, entregas ni certificados.
-- ─────────────────────────────────────────────────────────────

insert into public.course_resources (path_id, kind, title, description, module_id, tags, source, url)
select v.* from (values
  -- Material del curso
  ('prueba_digital', 'presentation', 'Presentación de la jornada', 'Las diapositivas de todo el día, bloque por bloque, con las actividades y los tiempos. Para repasar después de cada bloque.', 'pd_b1', array['presentación','repaso'], 'CERT Académico', '/materiales/prueba-digital/presentacion-prueba-digital.html'),
  ('prueba_digital', 'document', 'Expediente del caso Ferretería El Roble (Word)', 'Hechos del caso, las seis evidencias y las hojas de trabajo 1 a 7 que el grupo diligencia durante el día.', 'pd_b1', array['caso','hojas de trabajo','grupo'], 'CERT Académico', '/materiales/prueba-digital/expediente-caso-ferreteria-el-roble.docx'),

  -- Colombia: normas
  ('prueba_digital', 'link', 'Ley 906 de 2004 — Código de Procedimiento Penal', 'Texto vigente con notas de vigencia. Claves para el curso: arts. 23 (cláusula de exclusión), 235 a 237 y 244 (actuaciones y control posterior), 275 (elementos materiales probatorios), 277 (autenticidad), 359 y 360 (exclusión en la preparatoria), 405, 422 y 455.', 'pd_b4', array['Ley 906','procedimiento penal','norma'], 'Secretaría General del Senado', 'http://www.secretariasenado.gov.co/senado/basedoc/ley_0906_2004.html'),
  ('prueba_digital', 'link', 'Ley 527 de 1999 — Mensajes de datos y comercio electrónico', 'Equivalencia funcional, valor probatorio de los mensajes de datos (arts. 10 y 11) y firmas digitales. Base de la discusión sobre chats, correos y capturas.', 'pd_b4', array['Ley 527','mensaje de datos','norma'], 'Secretaría General del Senado', 'http://www.secretariasenado.gov.co/senado/basedoc/ley_0527_1999.html'),
  ('prueba_digital', 'link', 'Ley 1273 de 2009 — Delitos informáticos', 'Agrega al Código Penal el título «De la protección de la información y de los datos» (arts. 269A a 269J). Útil para la calificación jurídica del caso.', 'pd_b4', array['Ley 1273','delitos informáticos','norma'], 'Secretaría General del Senado', 'http://www.secretariasenado.gov.co/senado/basedoc/ley_1273_2009.html'),
  ('prueba_digital', 'link', 'Ley 1564 de 2012 — Código General del Proceso', 'Referencia complementaria: arts. 243 a 247 sobre documentos y mensajes de datos. Se aplica en lo no regulado por la Ley 906 (art. 25 de la Ley 906).', 'pd_b4', array['CGP','mensaje de datos','norma'], 'Secretaría General del Senado', 'http://www.secretariasenado.gov.co/senado/basedoc/ley_1564_2012.html'),

  ('prueba_digital', 'link', 'Ley Estatutaria 2573 de 2026 — Suplantación de identidad', 'Suspensión del cobro y del reporte negativo a la víctima de suplantación, entrega de los documentos de aprobación y carga dinámica de la prueba (art. 2, lit. d), que según la C-413 de 2025 no se aplica en procesos penales. Rige seis meses después de su promulgación (20 de mayo de 2026).', 'pd_b4', array['Ley 2573','suplantación','carga de la prueba','norma'], 'Secretaría General del Senado', 'http://www.secretariasenado.gov.co/senado/basedoc/ley_2573_2026.html'),
  -- Colombia: jurisprudencia
  ('prueba_digital', 'link', 'Sentencia C-413 de 2025 — Control previo de la Ley 2573', 'La Corte declara constitucional el proyecto y condiciona la carga dinámica de la prueba: se aplica en procesos judiciales que no son penales y el juez decide si opera la inversión.', 'pd_b4', array['jurisprudencia','Ley 2573','carga de la prueba'], 'Corte Constitucional', 'https://www.corteconstitucional.gov.co/relatoria/2025/C-413-25.htm'),
  ('prueba_digital', 'link', 'Sentencia T-043 de 2020 — Capturas de pantalla de WhatsApp', 'La Corte Constitucional trata los pantallazos de WhatsApp como prueba indiciaria y explica por qué hay que valorarlos con otros medios. Base del bloque «¿Vale o no vale?».', 'pd_b6', array['jurisprudencia','WhatsApp','valoración'], 'Corte Constitucional', 'https://www.corteconstitucional.gov.co/relatoria/2020/T-043-20.htm'),
  ('prueba_digital', 'link', 'Sentencia C-224 de 2019 — Control del Convenio de Budapest', 'La Corte declara exequibles el Convenio sobre la Ciberdelincuencia y la Ley 1928 de 2018 que lo aprueba.', 'pd_b3', array['jurisprudencia','Budapest','cooperación'], 'Corte Constitucional', 'https://www.corteconstitucional.gov.co/relatoria/2019/C-224-19.htm'),

  -- Internacional
  ('prueba_digital', 'link', 'Ley 1928 de 2018 — Convenio de Budapest sobre la Ciberdelincuencia', 'Texto completo en español del Convenio, tal como lo aprobó Colombia: tipos penales, conservación rápida de datos (arts. 16 y 17) y cooperación internacional (arts. 23 a 35).', 'pd_b3', array['Budapest','cooperación','norma'], 'Secretaría General del Senado', 'http://www.secretariasenado.gov.co/senado/basedoc/ley_1928_2018.html'),
  ('prueba_digital', 'link', 'Convención de las Naciones Unidas contra la Ciberdelincuencia', 'Página oficial de la convención adoptada por la Asamblea General en diciembre de 2024: texto, firmas y estado de ratificaciones (en inglés).', 'pd_b3', array['ONU','cooperación','inglés'], 'UNODC', 'https://www.unodc.org/unodc/en/cybercrime/convention/home.html'),
  ('prueba_digital', 'link', 'Reglamento (UE) 2023/1543 sobre prueba electrónica', 'Órdenes europeas de producción y conservación de pruebas electrónicas dirigidas a los proveedores de servicios. Texto en español.', 'pd_b3', array['Unión Europea','e-evidence','cooperación'], 'EUR-Lex', 'https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32023R1543'),
  ('prueba_digital', 'link', 'CLOUD Act — recursos del Departamento de Justicia de EE. UU.', 'Cómo se piden datos a proveedores de EE. UU. (como el correo en la nube de la evidencia E) y qué acuerdos existen. En inglés.', 'pd_b3', array['Estados Unidos','nube','cooperación','inglés'], 'U.S. Department of Justice', 'https://www.justice.gov/criminal/cloud-act-resources'),
  ('prueba_digital', 'link', 'Reglas Federales de Evidencia de EE. UU., regla 901 — Autenticación', 'Cómo se demuestra que una prueba «es lo que se dice que es». Comparar con el art. 277 de la Ley 906. En inglés.', 'pd_b3', array['Estados Unidos','autenticación','inglés'], 'Cornell Law School (LII)', 'https://www.law.cornell.edu/rules/fre/rule_901'),
  ('prueba_digital', 'link', 'Reglas Federales de Evidencia de EE. UU., regla 902 — Autoautenticación', 'Los numerales 13 y 14 permiten autenticar registros electrónicos y copias forenses con una certificación y el hash. En inglés.', 'pd_b3', array['Estados Unidos','hash','autenticación','inglés'], 'Cornell Law School (LII)', 'https://www.law.cornell.edu/rules/fre/rule_902'),

  -- Recolección y cadena de custodia
  ('prueba_digital', 'document', 'Manual del Sistema de Cadena de Custodia (2018)', 'Manual oficial de la Fiscalía y el Consejo Nacional de Policía Judicial: etapas, rótulos, registros y responsables. PDF.', 'pd_b5', array['cadena de custodia','Fiscalía','manual'], 'Fiscalía General de la Nación', 'https://www.fiscalia.gov.co/media-portalweb-prd/MANUAL-DEL-SISTEMA-DE-CADENA-DE-CUSTODIA.pdf'),
  ('prueba_digital', 'document', 'Manual Único de Policía Judicial, versión 3 (2025)', 'Actuaciones de policía judicial y su control (Acuerdo 003 de 2025 del Consejo Nacional de Policía Judicial). PDF de unos 8 MB.', 'pd_b5', array['policía judicial','Fiscalía','manual'], 'Consejo Nacional de Policía Judicial', 'https://www.fiscalia.gov.co/media-portalweb-prd/Manual-CTI-Unico-de-Policia-Judicial.pdf'),
  ('prueba_digital', 'link', 'RFC 3227 — Guía para recolectar y conservar evidencia', 'Guía técnica clásica: orden de volatilidad (qué recoger primero) y principios de conservación. En inglés.', 'pd_b5', array['técnico','volatilidad','inglés'], 'IETF', 'https://www.rfc-editor.org/rfc/rfc3227'),
  ('prueba_digital', 'link', 'NIST SP 800-86 — Técnicas forenses en la respuesta a incidentes', 'Las cuatro fases del análisis forense (recolección, examen, análisis e informe) explicadas para no especialistas. En inglés.', 'pd_b2', array['técnico','forense','inglés'], 'NIST', 'https://csrc.nist.gov/pubs/sp/800/86/final')
) as v(path_id, kind, title, description, module_id, tags, source, url)
where not exists (
  select 1 from public.course_resources r where r.path_id = v.path_id and r.url = v.url
);

-- Comprobación: debe mostrar 20 recursos en el curso prueba_digital.
select count(*) as recursos_prueba_digital from public.course_resources where path_id = 'prueba_digital';
