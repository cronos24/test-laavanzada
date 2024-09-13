<template>
    <div>
        <Button label="Ingreso de Gestión" @click="showModal = true" />

        <Dialog header="Ingreso de Gestión" v-model:visible="showModal" modal :style="{ width: '50vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" >
            <Fieldset legend="Datos de la Gestión">
                <Form @closeDialog="closeDialog" />
            </Fieldset>

        </Dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Fieldset from 'primevue/fieldset';
import Form from './form.vue';

const showModal = ref(false);

const closeDialog = () => {
    showModal.value = false;
};

</script>