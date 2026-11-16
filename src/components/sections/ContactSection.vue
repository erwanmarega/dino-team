<script setup>
import { reactive, ref } from 'vue'
import BookingLink from '../BookingLink.vue'
import { site } from '../../config/site'

const hasBooking = Boolean(site.bookingUrl || site.discoveryUrl)

const form = reactive({ name: '', email: '', message: '' })
const status = ref('')

// No backend: the form opens the visitor's mail client addressed to the coach.
const submit = () => {
  if (!site.email) {
    status.value = 'Formulaire bientôt disponible — utilise Instagram en attendant.'
    return
  }
  const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
  const subject = encodeURIComponent('Contact DinoTeam')
  window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
  status.value = ''
}
</script>

<template>
  <section id="contact" class="contact">
    <form class="contact__form card" @submit.prevent="submit">
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

      <button type="submit" class="btn btn--leaf btn--xl contact__submit">Envoyer</button>
      <p v-if="status" class="contact__note" role="status">{{ status }}</p>
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
