<script setup lang="ts">
import { ref, watch } from 'vue'

const emit = defineEmits(['update:isOpen', 'saved'])

const props = defineProps<{
  isOpen: boolean
  loading: boolean
}>()

const internalOpen = ref(props.isOpen)

watch(
  () => props.isOpen,
  (val) => {
    internalOpen.value = val
  },
)

watch(internalOpen, (val) => {
  emit('update:isOpen', val)
})

const name = ref('')
const email = ref('')
const roles = ref<string[]>([])
const password = ref('')

const title = 'Adicionar Usuário'

function close() {
  internalOpen.value = false
  resetForm()
}

function submit() {
  const payload = {
    name: name.value,
    email: email.value,
    roles: roles.value,
    password: password.value,
  }

  emit('saved', payload)
  //close()
}

function resetForm() {
  name.value = ''
  email.value = ''
  roles.value = []
  password.value = ''
}
</script>

<template>
  <v-dialog v-model="internalOpen" max-width="500" persistent transition="dialog-bottom-transition">
    <v-card>
      <v-card-title class="text-h6 font-weight-bold">
        <v-icon class="me-2">mdi-account-plus</v-icon>
        {{ title }}
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="submit" autocomplete="off">
          <v-text-field v-model="name" label="Nome" prepend-inner-icon="mdi-account" required />
          <v-text-field
            v-model="email"
            label="Email"
            prepend-inner-icon="mdi-email"
            type="email"
            required
            autocomplete="new-email"
          />
          <v-select
            v-model="roles"
            :items="['ROLE_ADMIN', 'ROLE_USER']"
            label="Permissões"
            prepend-inner-icon="mdi-shield-account"
            multiple
            chips
            required
          />
          <v-text-field
            v-model="password"
            label="Senha"
            prepend-inner-icon="mdi-lock"
            type="password"
            :rules="[(v) => !!v || 'Senha obrigatória']"
            required
            autocomplete="new-password"
          />
        </v-form>
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn variant="tonal" color="grey" @click="close">Cancelar</v-btn>
        <v-btn color="primary" variant="flat" @click="submit" :loading="loading" :disabled="loading"
          >Salvar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
