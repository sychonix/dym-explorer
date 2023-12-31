<template>
    <v-dialog v-if="greet" v-model="dialog" width="500">
        <v-card>
            <canvas v-if="animate" id="animate"></canvas>
            <v-card-title class="headline" primary-title>
                {{ $t('message.welcome.title') }}
            </v-card-title>
            <v-card-text>
                {{ $t('message.welcome.text1') }} <a :href="`mailto:${supportEmail}`">{{ supportEmail }}</a> {{ $t('message.welcome.text2') }}
                <a href="https://github.com/EthVM/EthVM">{{ $t('about.git.title') }} </a> {{ $t('message.welcome.text3') }}
            </v-card-text>
            <v-card-text>
                {{ $t('message.welcome.text4') }}
            </v-card-text>
            <v-card-actions>
                <v-layout row justify-end align-end fill-height>
                    <v-btn href="https://www.reddit.com/r/ethvm" icon> <v-icon class="fab fa-reddit grey--text"></v-icon> </v-btn>
                    <v-btn href="https://twitter.com/Eth_VM" icon> <v-icon class="fab fa-twitter grey--text"></v-icon> </v-btn>
                    <v-btn href="https://github.com/EthVM" icon> <v-icon class="fab fa-github grey--text"></v-icon> </v-btn>
                    <v-btn href="https://medium.com/@myetherwallet" icon> <v-icon class="fab fa-medium-m grey--text"></v-icon> </v-btn>
                </v-layout>
            </v-card-actions>
            <v-card-actions>
                <v-layout align-center justify-center row fill-height>
                    <v-btn color="secondary" depressed class="text-capitalize mb-4" @click="removeDialog">
                        {{ $t('message.welcome.btn') }}
                    </v-btn>
                </v-layout>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { Mixins, Component, Watch } from 'vue-property-decorator'
import confetti from 'canvas-confetti'
import { GreetMixin } from '../mixins/Greet/greeting-mixin'
@Component
export default class AppGreeting extends Mixins(GreetMixin) {
    /*
  ===================================================================================
    Initial Data
  ===================================================================================
  */

    dialog = true
    supportEmail = 'support@ethvm.com'
    animate = true

    /*
  ===================================================================================
    Computed
  ===================================================================================
  */

    get greet(): boolean {
        return !this.userNotFirstTimeLoading && !this.userNotFirstTime
    }

    /*
  ===================================================================================
   Watch
  ====================================()===============================================
  */

    /**
     * Watches changes in greet .
     * If changed to true -> open greet dialog
     */
    @Watch('greet')
    onGreetChange(): void {
        if (this.greet && this.animate) {
            setTimeout(() => {
                this.createAnimation()
            }, 500)
            setTimeout(() => {
                this.animate = false
            }, 5000)
        }
    }
    /**
     * Watches changes in  dialog.
     * If changed  to false -> set not first time visit
     */
    @Watch('dialog')
    onDialogChange(): void {
        if (!this.dialog) {
            this.setNotFirstTimeTrue()
        }
    }
    /*
  ===================================================================================
    Methods
  ===================================================================================
  */
    /**
     * Removes dialog and sets
     * notFirsTimeVisit in localStorage as true
     */
    removeDialog(): void {
        this.dialog = false
    }
    /**
     * Creates confetti animation
     * with canvas
     */
    createAnimation(): void {
        const myCanvas: any = document.getElementById('animate')
        const colors = ['#6270fc', '#92cce1', '#fed9a1', '#fe8778', '#00b173', '#fe1377', '#eea66b']
        myCanvas.confetti =
            myCanvas.confetti ||
            confetti.create(myCanvas, {
                resize: true
            })

        myCanvas.confetti({
            particleCount: 100,
            spread: 50,
            origin: {
                y: 1
            },
            colors: colors
        })
    }
}
</script>

<style scoped lang="css">
canvas {
    position: absolute;
    width: 99%;
    height: 99%;
}
</style>
