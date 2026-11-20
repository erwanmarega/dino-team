<script setup>
import { onMounted, reactive, ref } from 'vue'
import BookingLink from '../BookingLink.vue'
import { site } from '../../config/site'

const hasBooking = Boolean(site.bookingUrl || site.discoveryUrl)

const form = reactive({ name: '', email: '', message: '', website: '' })
// 'idle' | 'sending' | 'success' | 'error'
const status = ref('idle')
const errorKind = ref('')
const startedAt = ref(0)

onMounted(() => {
  startedAt.value = Date.now()
})

const submit = async () => {
  if (status.value === 'sending') return
  status.value = 'sending'
  errorKind.value = ''

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 12000)
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        message: form.message,
        website: form.website,
        startedAt: startedAt.value,
      }),
      signal: controller.signal,
    })
    const data = await res.json().catch(() => ({}))
    if (res.ok && data.ok === true) {
      form.name = ''
      form.email = ''
      form.message = ''
      form.website = ''
      startedAt.value = Date.now()
      status.value = 'success'
    } else {
      errorKind.value = ['invalid', 'retry'].includes(data.error) ? data.error : 'failed'
      // A stale or too-fast submission: restart the timer so a retry passes.
      if (data.error === 'retry') startedAt.value = Date.now() - 60000
      status.value = 'error'
    }
  } catch {
    errorKind.value = 'failed'
    status.value = 'error'
  } finally {
    clearTimeout(timer)
  }
}
</script>

<template>
  <section id="contact" class="contact">
    <form class="contact__form card"
      :aria-busy="status === 'sending'"
      @submit.prevent="submit"
    >
      <h2 class="contact__title font-display">Écris-nous</h2>

      <div class="field">
        <label for="contact-name" class="field__label">Nom</label>
        <input
          id="contact-name"
          v-model="form.name"
          class="field__input"
          type="text"
          name="name"
          autocomplete="name"
          maxlength="100"
          required
        />
      </div>
      <div class="field">
        <label for="contact-email" class="field__label">E-mail</label>
        <input
          id="contact-email"
          v-model="form.email"
          class="field__input"
          type="email"
          name="email"
          autocomplete="email"
          maxlength="255"
          required
        />
      </div>
      <div class="field">
        <label for="contact-message" class="field__label">
          Ton message (coaching, boutique, collaboration…)
        </label>
        <textarea
          id="contact-message"
          v-model="form.message"
          class="field__input"
          name="message"
          rows="4"
          maxlength="1000"
          required
        ></textarea>
      </div>

      <div class="contact__hp" aria-hidden="true">
        <!-- Honeypot: name chosen so browsers and password managers don't autofill it -->
        <label for="contact-hp">Ne pas remplir</label>
        <input
          id="contact-hp"
          v-model="form.website"
          type="text"
          name="contact_url_confirm"
          autocomplete="off"
          tabindex="-1"
        />
      </div>

      <button
        type="submit"
        class="btn btn--leaf btn--xl contact__submit"
        :disabled="status === 'sending'"
      >
        {{ status === 'sending' ? 'Envoi…' : 'Envoyer' }}
      </button>

      <p v-if="status === 'success'" class="contact__msg contact__msg--success" role="status" aria-live="polite">
        Message envoyé ✓ {{ site.coachFirstName }} te répond rapidement.
      </p>
      <p v-else-if="status === 'error' && errorKind === 'retry'" class="contact__msg contact__msg--error" role="alert">
        Petit souci, renvoie ton message dans quelques secondes.
      </p>
      <p v-else-if="status === 'error' && errorKind === 'invalid'" class="contact__msg contact__msg--error" role="alert">
        Vérifie les champs : un nom, un e-mail valide et ton message.
      </p>
      <p v-else-if="status === 'error'" class="contact__msg contact__msg--error" role="alert">
        L'envoi a échoué. Écris directement à
        <template v-if="site.email"><a :href="`mailto:${site.email}`">{{ site.email }}</a></template>
        <template v-else>l'adresse indiquée sur le site</template>
        ou sur Instagram.
      </p>

      <p class="contact__privacy">
        Tes informations servent uniquement à te répondre.
        <RouterLink :to="{ name: 'confidentialite' }">Politique de confidentialité</RouterLink>
      </p>
    </form>

    <div class="contact__actions">
      <template v-if="hasBooking">
        <BookingLink class="btn btn--leaf">Réserver mon bilan</BookingLink>
        <BookingLink kind="discovery" class="btn btn--trail">Réserver ma séance découverte</BookingLink>
      </template>
      <p v-else class="contact__note">
        Réservation en ligne bientôt disponible — écris-nous en attendant.
      </p>
    </div>
  </section>
</template>

<style scoped>
.contact {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  scroll-margin-top: 6rem;
}
.contact__form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.25rem;
}
.contact__title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
.field__label {
  font-size: 0.8rem;
  color: var(--muted-foreground);
}
.field__input {
  width: 100%;
  padding: 0.65rem 0.75rem;
  border: 1px solid var(--input);
  border-radius: var(--radius);
  background: transparent;
  color: var(--foreground);
  font: inherit;
  font-size: 0.95rem;
}
textarea.field__input {
  resize: vertical;
  min-height: 6rem;
}
.field__input:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 1px;
  border-color: var(--ring);
}
.contact__submit {
  width: 100%;
}
.contact__hp {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
.contact__msg {
  margin: 0;
  font-size: 0.875rem;
}
.contact__msg--success {
  color: var(--primary);
}
.contact__msg--error {
  color: var(--destructive);
}
.contact__msg a {
  color: inherit;
  text-decoration: underline;
}
.contact__privacy {
  margin: 0;
  font-size: 0.75rem;
  color: var(--muted-foreground);
}
.contact__privacy a {
  color: inherit;
  text-decoration: underline;
}
.contact__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
.contact__note {
  margin: 0;
  font-size: 0.875rem;
  color: var(--muted-foreground);
}
</style>
