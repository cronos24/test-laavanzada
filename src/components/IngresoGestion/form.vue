<script setup>
import { ref, defineEmits } from 'vue';
import { useToast } from "primevue/usetoast";
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import DatePicker from 'primevue/datepicker';
import AutoComplete from 'primevue/autocomplete';
import InputNumber from 'primevue/inputnumber';

const submitted = ref(false);
const toast = useToast();
const tipos = ref([{ name: 'CONTACTO DIRECTO', code: 'CD' }]);
const gestiones = ref([{ name: 'COMP. DE PAGO ABONO', code: 'CDPA' }]);
const filteredType = ref();
const filteredGestion = ref();
const emit = defineEmits(['closeDialog']);

const registro = ref({
    negocio: null,
    usuario: null,
    fecha: null,
    telefono: null,
    direccion: null,
    tipo: null,
    gestion: null,
    compromiso: 0,
    fechaPago: null,
    comentario: null,
});

const resetForm = () => {
    registro.value = {
        negocio: null,
        usuario: null,
        fecha: null,
        telefono: null,
        direccion: null,
        tipo: null,
        gestion: null,
        compromiso: 0,
        fechaPago: null,
        comentario: null,
    };
    submitted.value = false;
};


const onSubmit = async () => {

    submitted.value = true;
    if (registro.value.negocio != null) {
        toast.add({ severity: 'info', summary: 'Info', detail: 'Message Content', life: 3000 });
        emit('closeDialog');
        submitted.value = false;
        resetForm();
    }

};

const buscarTipo = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            filteredType.value = [...tipos.value];
        } else {
            filteredType.value = tipos.value.filter((tipo) => {
                return tipo.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 250);
}

const buscarGestion = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            filteredGestion.value = [...gestiones.value];
        } else {
            filteredGestion.value = gestiones.value.filter((gestion) => {
                return gestion.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 250);
}



</script>

<template>
    <div class="p-fluid pt-3 w-100">
        <form @submit.prevent="onSubmit">
            <div class="formgrid grid w-100">
                <div class="col-12">
                    <div class="p-field ">
                        <label for="negocio" class="m-2">Negocio</label>
                        <InputText id="negocio" v-model.trim="registro.negocio" required
                            :class="{ 'p-invalid': submitted && !registro.negocio }" class="w-4" autofocus />

                        <small class="ml-2">FIP NPL-PRESTOF1</small>
                        <small class="p-invalid" v-if="submitted && !registro.negocio">Negocio es
                            obligatorio.</small>
                    </div>
                </div>
                <div class="col-12">
                    <div class="p-field ">
                        <label for="usuario" class="m-2">Usuario</label>
                        <InputText id="usuario" v-model.trim="registro.usuario" required
                            :class="{ 'p-invalid': submitted && !registro.usuario }" class="w-4" />
                        <small class="ml-2">ADMINISTRADOR</small>
                        <small class="p-invalid" v-if="submitted && !registro.usuario">Usuario es
                            obligatorio.</small>
                    </div>
                </div>

                <div class="col-12">
                    <div class="p-field ">
                        <label for="fecha" class="m-2">Fecha</label>
                        <DatePicker v-model="registro.fecha" showTime hourFormat="24"
                            :invalid="submitted && !registro.fecha" inputClass="w-full" />
                        <small class="p-invalid" v-if="submitted && !registro.fecha">Fecha es
                            obligatorio.</small>
                    </div>
                </div>

                <div class="col-12 p-0 m-0">
                    <div class="grid">
                        <div class="col-12 md:col-8 lg:col-8">
                            <div class="col-12">
                                <div class="p-field ">
                                    <label for="telefono" class="m-2">Teléfono</label>
                                    <InputText id="telefono" v-model.trim="registro.telefono" required
                                        :class="{ 'p-invalid': submitted && !registro.telefono }"
                                        class="lg:w-6 sm:w-8 md:w-8" />
                                    <small class="p-invalid" v-if="submitted && !registro.telefono">Teléfono es
                                        obligatorio.</small>
                                </div>
                            </div>

                            <div class="col-12">
                                <div class="p-field ">
                                    <label for="direccion" class="m-2">Dirección</label>
                                    <InputText id="direccion" v-model.trim="registro.direccion" required
                                        :class="{ 'p-invalid': submitted && !registro.direccion }"
                                        class="lg:w-6 sm:w-8 md:w-8" />
                                    <small class="p-invalid" v-if="submitted && !registro.direccion">Dirección es
                                        obligatorio.</small>
                                </div>
                            </div>

                            <div class="col-12">
                                <div class="p-field">
                                    <label for="tipo" class="m-2">Tipo</label>
                                    <AutoComplete v-model="registro.tipo" dropdown :suggestions="filteredType"
                                        @complete="buscarTipo" optionLabel="name" dropdownIcon="pi pi-angle-down"
                                        inputClass="lg:w-25rem sm:w-8rem md:w-25rem" />
                                    <small class="p-invalid" v-if="submitted && !registro.tipo">Tipo es
                                        obligatorio.</small>
                                </div>
                            </div>

                            <div class="col-12">
                                <div class="p-field">
                                    <label for="gestion" class="m-2">Gestión</label>
                                    <AutoComplete v-model="registro.gestion" dropdown :suggestions="filteredGestion"
                                        @complete="buscarGestion" optionLabel="name" dropdownIcon="pi pi-angle-down"
                                        inputClass="lg:w-25rem sm:w-8rem md:w-25rem" />
                                    <small class="p-invalid" v-if="submitted && !registro.gestion">Gestión es
                                        obligatorio.</small>
                                </div>
                            </div>

                            
                        </div>
                        <div class="col-12 md:col-4 lg:col-4 flex align-items-center sm:align-items-center md:align-items-start lg:align-items-start justify-content-start sm:">
                            <div class="grid">
                                <div class="col-12 py-2">
                                    <Button label="BV"  severity="secondary" class="mr-2"/>                                   
                          
                                    <Button label="NC"  severity="secondary" class="mr-2"/>                                   
                                </div>
                                <div class="col-12 pb-4">
                                    <Button label="ROD"  severity="secondary"/>                               
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-12 md:col-5 lg:col-5 flex align-items-center justify-content-start">
                                <div class="p-field flex align-items-center justify-content-start">
                                    <label for="compromiso" class="m-2 w-6rem">Compromiso Monto</label>

                                    <InputNumber required v-model="registro.compromiso" inputId="compromiso"
                                        mode="currency" currency="USD" locale="en-US"
                                        :class="{ 'p-invalid': submitted && !registro.compromiso }" class="w-8" />
                                    <small class="p-invalid" v-if="submitted && !registro.compromiso">Compromiso es
                                        obligatorio.</small>
                                </div>
                            </div>

                            <div class="col-12 md:col-7 lg:col-7 flex align-items-center justify-content-start">
                                <div class="p-field flex align-items-center justify-content-start">
                                    <label for="fechaPago" class="m-2">Para Cuando</label>
                                    <DatePicker v-model="registro.fechaPago" :invalid="submitted && !registro.fechaPago"
                                        inputClass="w-8" />
                                    <small class="p-invalid" v-if="submitted && !registro.fechaPago">Para Cuando es
                                        obligatorio.</small>
                                </div>
                            </div>

                <div class="col-12">
                    <div class="p-field ">
                        <label for="comentario" class="m-2">Comentario</label>
                        <InputText id="comentario" v-model.trim="registro.comentario" required
                            :class="{ 'p-invalid': submitted && !registro.comentario }"
                            class="lg:w-10 sm:w-8 md:w-10" />
                        <small class="p-invalid" v-if="submitted && !registro.comentario">Comentario es
                            obligatorio.</small>
                    </div>
                </div>

                <div class="col-12 flex justify-content-center flex-wrap pt-5">
                    <Button label="Aceptar" class="flex align-items-center justify-content-center m-2"
                        icon="pi pi-check" type="submit" :loading="submitted" />
                    <Button label="Salir" class="flex align-items-center justify-content-center m-2" icon="pi pi-times"
                        severity="secondary" />
                </div>
            </div>
        </form>
    </div>
</template>

<style scoped>
.p-field {
    margin-bottom: 1rem;
}

.p-field label {
    display: inline-block;
    width: 70px;
    /* Ajusta este valor según tu preferencia */
    text-align: right;
    /* Alinea el texto a la derecha para mantener el estilo */
    margin-right: 20px !important;
    /* Espacio entre la etiqueta y el campo de entrada */
}

.p-datepicker {
    display: inline-flex;
    max-width: 100%;
    min-width: 40%;
}
</style>