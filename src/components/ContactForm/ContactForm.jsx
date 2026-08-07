import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';
import { useLanguage } from '../../context/languageContext';
import styles from './ContactForm.module.css';

/* Formulaire natif via Formspree (formspree.io) : gratuit, sans backend à
   héberger. Remplacer FORM_ID par l'identifiant fourni après création d'un
   formulaire sur le compte Formspree — le champ n'est fonctionnel qu'une
   fois cet identifiant renseigné. */
const FORM_ID = 'YOUR_FORM_ID';
const ENDPOINT = `https://formspree.io/f/${FORM_ID}`;

const INITIAL_VALUES = { name: '', email: '', message: '' };

const ContactForm = ({ fallbackEmail }) => {
  const [status, setStatus] = useState('idle');
  const [values, setValues] = useState(INITIAL_VALUES);
  const { dict } = useLanguage();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(event.target),
      });
      if (response.ok) {
        setStatus('success');
        setValues(INITIAL_VALUES);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className={styles.wrapper}>
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            className={styles.success}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="status"
          >
            <CheckCircle2 size={20} strokeWidth={1.75} />
            <p>{dict.contactForm.success}</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className={styles.form}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="cf-name">{dict.contactForm.name}</label>
                <input
                  id="cf-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={values.name}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="cf-email">{dict.contactForm.email}</label>
                <input
                  id="cf-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={values.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="cf-message">{dict.contactForm.message}</label>
              <textarea
                id="cf-message"
                name="message"
                rows={4}
                required
                value={values.message}
                onChange={handleChange}
              />
            </div>

            <div className={styles.footerRow}>
              {status === 'error' && (
                <p className={styles.error}>
                  <AlertCircle size={15} strokeWidth={1.75} />
                  {dict.contactForm.error(fallbackEmail)}
                </p>
              )}
              <button type="submit" className={styles.submit} disabled={status === 'loading'}>
                {status === 'loading' ? (
                  <>
                    <Loader2 size={16} strokeWidth={1.75} className={styles.spin} />
                    {dict.contactForm.sending}
                  </>
                ) : (
                  <>
                    {dict.contactForm.send}
                    <Send size={15} strokeWidth={1.75} />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactForm;
