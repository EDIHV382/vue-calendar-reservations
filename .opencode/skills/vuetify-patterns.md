# Skill: Vuetify Patterns

## Tarjeta de sensor
<v-card rounded="lg" elevation="2">
  <v-card-title>Temperatura</v-card-title>
  <v-card-text>
    <v-chip :color="statusColor" size="small">{{ status }}</v-chip>
  </v-card-text>
</v-card>

## Layout responsivo
<v-container fluid>
  <v-row>
    <v-col cols="12" sm="6" md="3"><!-- tarjeta --></v-col>
  </v-row>
</v-container>

## Formulario con validación
<v-form ref="formRef" @submit.prevent="submit">
  <v-text-field
    v-model="valor"
    label="Campo"
    :rules="[v => !!v || 'Requerido']"
    variant="outlined"
    density="comfortable"
  />
  <v-btn type="submit" color="primary" variant="flat">Guardar</v-btn>
</v-form>

## Variantes correctas
Botón principal: variant="flat" color="primary"
Botón secundario: variant="outlined"
Inputs: variant="outlined" density="comfortable"
Cards: elevation="2" rounded="lg"