<template>
    <div :bgImg="bgImg" class="q-pa-md margin justify-center item-center" :style="{backgroundImage: `url(${bgImg})`}">
        <!--<img :src="logo" />-->
        <q-form @submit="onSubmit" class="q-gutter-md margin" ref="signUp">
          <!--Email---->
            <q-input v-model="user.email" type="email" label="Email" lazy-rules :rules="rules.email"/>

            <!--Password-->
            <q-input color="none" v-model="user.password" type="password" label="Password" lazy-rules :rules="rules.password"/>

            <router-link :to="{name: 'PasswordRecovery'}">Forget password?</router-link>
            <q-btn label="Sign in" type="submit" color="primary"></q-btn>
        </q-form>


            <q-btn v-for="social in socials" :key="social.id" class="bl" rounded :icon="social.icon" color="primary" @click="socialSignIn(social.id)">{{social.id}}</q-btn>

        <div id="auth-ui">
        </div>
        <p>Don't have an account? <router-link to="/signup">Sign up</router-link></p>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { auth } from "../api/auth/SupabaseAuth";
//import { FirebaseAuth } from "../api/auth/FirebaseAuth";
import {Axiosi} from "../api/Axiosi"

let client = new Axiosi()

let socials: Record<string, any>

//let auth = new FirebaseAuth()

export default defineComponent({
    name: 'SignIn',

    data() {
      const user = ref({
        email: "",
        password: ""
      })

      const emailRef = ref<any>(null)

      //const passwordRef = ref(null)

        return {
          emailRef,

            client,
            auth,
            socials,
            bgImg: "a",
            user,
            rules: {
              email: [
                (val: string|null) => (val !== null&&val !== '') || "Email is required",
                (val: string) => {
                  let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                  return re.test(val) || "Please enter a valid email"
                }
            ],
            password: [
                (val: string|null) => (val !== null&&val !== '') || "Password is required",
                (val: string) => val.length > 6 || "Password too short",
                (val: string) => val.length < 129 || "Password too long"
            ]
            },
          errors: {
            passwordLengthErr: '',
            signUpErrMsg: '',
            email: "",
            password: ""
          },
          errorList: []
        }
    },
    props: {
        myUrl: {
            type: String,
            required: true
        },
        /*logo: {
            type: String,
            required: true
        },
        login: {
            type: Boolean,
            required: true
        }*/
    },
    computed: {
        /*validPassword() {
          console.log("this is the user", this.user)
          console.log("this is gImg", this.bgImg)
          if (this.user.password.length < 7&&this.user.password.length >0) {
            return 'Your password is too short.';
          }
          else if (this.user.password.length > 128){
            return 'Your password is too long.'
          }

          return "Password is required"
        },
        validEmail() {
          let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (this.user.email !== null) {
            if(!re.test(this.user.email)) {
              return "Please enter a valid email"
            }
          }
          return 'Email address is required';
        }*/
    },
    methods: {
        socialSignIn(id: string) {
            this.auth.login(id)
        },
        async onSubmit() {
          /*this.validate().then(() => {
            if (this.errorList.length > 0) {
              return
            }
          })*/
          //this.emailRef.value.validate()
            await this.auth.login(undefined, this.user)
            /*if (error) {
              this.errors.signUpErrMsg = error.message;
            console.log('this.errors.signuperror: ', this.errors.signUpErrMsg)
            console.log(user, session)
            }*/
            /*else {
              this.$router.push({path: this.myUrl})
            }*/

        },
      onload() {
        this.$emit("showHeader", true)
      }
    },
    mounted() {
        this.client.load("../config.json").then(resp => {
            if (resp) {
                this.socials = resp.data.socials
            }
        })
        this.onload()
        //this.auth.startUI()
        const sess = this.auth.startSession()
        console.log("sess: ", sess)
    }
})
</script>

<style scoped>
	.margin {
    text-align:center;
    /*width: 50%;*/
    margin-left: 15%;
    margin-right: 15%;
    margin-top: 5%
  }
  .bl {
    text-align: center;
    white-space: no-wrap;
    display: inline;
    margin-left: 5%;
    /*margin-right: 15%;*/
    margin-top: 2%;
    margin-bottom: 2%;
  }
</style>
