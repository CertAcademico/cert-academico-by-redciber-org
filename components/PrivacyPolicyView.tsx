import React from 'react';
import { BRAND, DATA_CONTROLLER, POLICY_VERSION } from '../platform';

const pending = (value: string) => value || 'pendiente de publicación';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-6">
    <h2 className="text-lg font-bold text-white mb-2">{title}</h2>
    <div className="text-slate-300 text-sm leading-relaxed space-y-2">{children}</div>
  </section>
);

/** Política de Tratamiento de Datos Personales (Ley 1581 de 2012). Pública, no requiere sesión. */
export const PrivacyPolicyContent: React.FC = () => (
  <div>
    <h1 className="text-2xl font-bold text-white mb-1">Política de Tratamiento de Datos Personales</h1>
    <p className="text-slate-400 text-xs mb-6">{BRAND} · Versión {POLICY_VERSION}</p>

    <Section title="1. Responsable del tratamiento">
      <p>
        {DATA_CONTROLLER.name} · Identificación: {pending(DATA_CONTROLLER.legalId)} · Domicilio:{' '}
        {pending(DATA_CONTROLLER.address)} · Correo de contacto: {pending(DATA_CONTROLLER.email)}
        {DATA_CONTROLLER.phone && ` · Teléfono: ${DATA_CONTROLLER.phone}`}.
      </p>
      <p>Esta política se expide en cumplimiento de la Ley 1581 de 2012 y el Decreto 1074 de 2015 de la República de Colombia.</p>
    </Section>

    <Section title="2. Datos que recolectamos">
      <p>
        Nombre completo y correo electrónico; contraseña, que se almacena cifrada y que nunca conocemos; el progreso, los
        puntajes y la actividad en los cursos; los badges y certificados emitidos; y la fecha y versión de esta política
        que usted aceptó. Nuestros proveedores registran además datos técnicos de acceso (como dirección IP y navegador)
        por motivos de seguridad.
      </p>
      <p>No solicitamos datos sensibles. Los cursos están dirigidos a personas mayores de edad; si usted es menor de 18 años, solo puede registrarse con la autorización de su representante legal.</p>
    </Section>

    <Section title="3. Finalidades">
      <p>Sus datos se usan para: (a) crear y administrar su cuenta; (b) registrar su avance en los cursos; (c) emitir y permitir la verificación de sus badges y certificados; (d) enviarle comunicaciones relacionadas con los cursos en los que participa; (e) elaborar estadísticas agregadas y anónimas para mejorar los cursos; (f) proteger la seguridad de la plataforma; y (g) calcular su puntaje en las convocatorias académicas en las que participe (como el ranking de la campaña de registro gratuito), seleccionar a los ganadores y contactarlos. El ranking completo no se publica: cada participante ve solo su posición.</p>
    </Section>

    <Section title="4. Verificación pública de badges y certificados">
      <p>
        Cada badge o certificado tiene un código único. Cualquier persona que tenga ese código o su enlace puede verificar
        el nombre del titular, el curso y la fecha de emisión. El correo electrónico nunca se muestra. Usted decide con quién
        comparte ese enlace.
      </p>
    </Section>

    <Section title="5. Derechos del titular">
      <p>Como titular de los datos usted puede: conocer, actualizar y rectificar sus datos; solicitar prueba de la autorización otorgada; ser informado sobre el uso que se les ha dado; revocar la autorización o solicitar la supresión de sus datos cuando no se respeten los principios, derechos y garantías legales; acceder gratuitamente a ellos; y presentar quejas ante la Superintendencia de Industria y Comercio (SIC).</p>
    </Section>

    <Section title="6. Cómo ejercer sus derechos">
      <p>
        Escriba a {pending(DATA_CONTROLLER.email)} indicando su nombre, el correo con el que se registró y su solicitud.
        Las consultas se responden en un máximo de diez (10) días hábiles y los reclamos en un máximo de quince (15) días
        hábiles, prorrogables en los términos de los artículos 14 y 15 de la Ley 1581 de 2012.
      </p>
    </Section>

    <Section title="7. Encargados y transmisión internacional">
      <p>
        Para prestar el servicio usamos proveedores tecnológicos que actúan como encargados del tratamiento: Supabase
        (base de datos y autenticación) y Vercel (alojamiento de la plataforma). Sus servidores pueden estar ubicados fuera
        de Colombia. Al aceptar esta política, usted autoriza esa transmisión, que se realiza únicamente para las
        finalidades aquí descritas y con medidas de seguridad como cifrado en tránsito, control de acceso por roles y
        contraseñas cifradas.
      </p>
    </Section>

    <Section title="8. Conservación">
      <p>Conservamos sus datos mientras su cuenta esté activa y sea necesario para las finalidades descritas. Los datos de los certificados emitidos se conservan para permitir su verificación, salvo que usted solicite su supresión.</p>
    </Section>

    <Section title="9. Vigencia">
      <p>Esta política rige desde el {POLICY_VERSION}. Si la modificamos de forma sustancial, se lo informaremos y le pediremos de nuevo su autorización cuando la ley lo exija.</p>
    </Section>
  </div>
);

const PrivacyPolicyView: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={onClose}>
    <div
      className="w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-slate-900 border border-slate-700 rounded-2xl p-6"
      onClick={e => e.stopPropagation()}
    >
      <PrivacyPolicyContent />
      <button
        onClick={onClose}
        className="w-full mt-2 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all text-sm"
      >
        Cerrar
      </button>
    </div>
  </div>
);

export default PrivacyPolicyView;
