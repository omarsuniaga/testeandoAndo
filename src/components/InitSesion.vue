<script setup>
import { createUser, initGoogle, login } from "../firebase/operators";
import { reactive } from "vue";

const config = reactive({
  registrar: false,
  typePass1: "Password",
  typePass2: "Password",
  pass2: false,
  btn1: "Entrar",
  btn2: "Registrarme",
});

const user = reactive({
  name: "",
  email: "",
  pass1: "",
  pass2: "",
  check: false,
});
const validar = async (op) => {
  if (op === 0) {
    //Registrar
    config.registrar = true;
    config.btn1 = "";
    config.btn2 = "Siguiente";
    return;
  }
  if (op === 1) {
    // Loggear
    return;
  }
};
const validarPass = () => {
  user.pass1 === user.pass2 ? settearUser() : alert("Claves no coinciden");
};
const validarCampos = async () => {
  user.name.trim() != "" && user.email.trim() != "" && user.pass1.trim() != ""
    ? (config.pass2 = true)
    : alert("Campos Vacios");
};
const volver = () => {
  user.pass1 = "";
  user.pass2 = "";
  config.pass2 = false;
};
const settearUser = async () => {
  await createUser({ ...user });
  // await login(user.email, user.pass1);
};

const loginUser = async () => {
  await login({ ...user });
};
</script>
<template>
  <div class="container d-flex justify-content-center mt-5" style="width: 70vw">
    <div class="card card-body shadow">
      <button class="btn btn-white" @click="initGoogle">
        <span style="font-size: 16px; color: rgb(95, 184, 157)">
          <i class="fab fa-google"></i>
          Inicia con Google
        </span>
      </button>
      <div v-if="!config.registrar">
        <form @submit.prevent="loginUser" >
          <div class="m-4">
            <input
              type="email"
              placeholder="eMail"
              v-model="user.email"
              class="form-control"
              id="InputEmail"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="m-4">
            <input
              placeholder="Password"
              type="password"
              v-model="user.pass1"
              class="form-control"
              id="InputPassword1"
            />
          </div>
          <div class="m-4 d-flex justify-content-center">
            <input
              type="checkbox"
              class="form-check-input mx-2"
              id="Check1"
              v-model="user.check"
            />
            <label class="form-check-label" for="Check1">Recordar</label>
          </div>
          <div class="d-flex justify-content-center">
            <button type="submit" class="btn btn-primary" @click="loginUser">
              Entrar
            </button>
            <button type="button" class="btn btn-white" @click="validar(0)">
              {{ config.btn2 }}
            </button>
          </div>
        </form>
      </div>

      <!-- REGISTRA -->
      <div v-else>
        <form v-if="!config.pass2">
          <div class="m-4">
            <input
              type="text"
              placeholder="Nombre"
              v-model="user.name"
              class="form-control"
              id="InputName"
            />
          </div>
          <div class="m-4">
            <input
              type="email"
              placeholder="eMail"
              v-model="user.email"
              class="form-control"
              id="InputEmail"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="m-4">
            <input
              placeholder="Password"
              :type="config.typePass1"
              v-model="user.pass1"
              class="form-control"
              id="InputPassword1"
            />
          </div>
          <div class="m-4 d-flex justify-content-center">
            <span
              class="badge bg-info text-dark"
              @mouseenter="config.typePass1 = 'text'"
              @mouseout="config.typePass1 = 'password'"
            >
              Ver
            </span>
            <input
              type="checkbox"
              class="form-check-input mx-2"
              id="Check1"
              v-model="user.check"
            />
            <label class="form-check-label" for="Check1">Recordar</label>
          </div>
          <div class="d-flex justify-content-center">
            <button
              type="button"
              class="btn btn-white"
              @click="config.registrar = false"
            >
              Volver
            </button>
            <button type="button" class="btn btn-white" @click="validarCampos">
              {{ config.btn2 }}
            </button>
          </div>
        </form>
        <!-- REPETIR CLAVE -->
        <form v-else>
          <div class="m-4">
            <input
              placeholder="Repetir Password"
              :type="config.typePass2"
              v-model="user.pass2"
              class="form-control"
              id="InputPassword1"
            />
          </div>
          <div class="m-4 d-flex justify-content-center">
            <span
              class="badge bg-info text-dark"
              @mouseenter="config.typePass2 = 'text'"
              @mouseout="config.typePass2 = 'password'"
            >
              Ver</span
            >
          </div>
          <div class="d-flex justify-content-center">
            <button type="button" class="btn btn-white" @click="volver">
              Volver
            </button>
            <button type="button" class="btn btn-white" @click="validarPass">
              Terminar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
