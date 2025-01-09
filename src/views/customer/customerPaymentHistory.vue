<template>
    <v-container>
        <h1 class="text-center">Customer History (test)</h1>
        <br>
        <v-row>
            <v-col cols="1"></v-col>
            <v-col> <v-row>
                    <v-col cols="4">
                        <h3> <strong>Personal Information</strong> </h3>
                        <br>
                        Full Name: <strong> Maximo Merirido</strong> <br>
                        Address: <strong> 123 Maple Street Atlanta, GA, 30301 </strong> <br>
                        Number Card: <strong> xxxx-xxxx-xxxx-4785 </strong> <br>
                        Home Phone: <strong> 808 896-8987 </strong> <br>
                        Email: <strong> avasquez@red5g.com </strong> <br>
                        Status: <v-chip variant="tonal" color="#447845" rounded>
                            <strong> Active</strong></v-chip> <br>

                    </v-col>
                    <v-col cols="4">
                        <h3> <strong>Virtual Information</strong> </h3> <br>
                        Virtual Card: <strong>xxxx-xxxx-xxxx-3243</strong> <br>
                        Virtual Phone: <strong>896 698-9658</strong>

                    </v-col>
                    <v-col cols="4">
                        <h3> <strong>Plan Information</strong> </h3> <br>
                        Plan: <strong> Shipment and Installation </strong> <br>
                        Amount: <strong> $100 </strong> <br>
                        Start Date: <strong> 08/11/2024 </strong> <br>
                    </v-col>
                </v-row></v-col>
            <v-col cols="1"></v-col>
        </v-row>
        <br>
        <v-row>
            <v-col cols="1"></v-col>
            <v-col><v-data-table :headers="headersPayments" :items="payments" height="450" item-value="name"
                    hide-default-footer>
                    <template v-slot:item.status="{ item }">
                        <v-chip variant="tonal" color="#447845" rounded>
                            {{ item.status }}
                        </v-chip>
                    </template>
                </v-data-table></v-col>
            <v-col cols="1"></v-col>
        </v-row>
    </v-container>
</template>
<style></style>

<script lang="js">
import { ref } from 'vue'
export default {

    setup() {
        const headersPayments = ref([
            { title: '#', align: 'center', key: 'position' },
            { title: 'User', align: 'center', key: 'user' },
            { title: 'Plan', align: 'center', key: 'plan' },
            { title: 'Amount', align: 'center', key: 'amount' },
            { title: 'Date', align: 'center', key: 'date' },
            { title: 'Credit Card', align: 'center', key: 'creditCard' },
            { title: 'Status', align: 'center', key: 'status' }

        ])

        const payments = ref([
            {
                position: 1,
                user: 'avasquez',
                plan: 'Basic Plan',
                amount: '$100.00',
                date: '05/10/2024',
                creditCard: 'xxxx xxxx xxxx 8965',
                status: 'Solved'
            },
            {
                position: 2,
                user: 'avasquez',
                plan: 'Basic Plan',
                amount: '$65.00',
                date: '05/10/2024',
                creditCard: 'xxxx xxxx xxxx 8965',
                status: 'Solved'
            },
            {
                position: 3,
                user: 'avasquez',
                plan: 'Basic Plan',
                amount: '$75.00',
                date: '05/10/2024',
                creditCard: 'xxxx xxxx xxxx 8965',
                status: 'Solved'
            },
            {
                position: 4,
                user: 'avasquez',
                plan: 'Basic Plan',
                amount: '$85.00',
                date: '05/10/2024',
                creditCard: 'xxxx xxxx xxxx 8965',
                status: 'Solved'
            },
            {
                position: 5,
                user: 'jrodriguez',
                plan: 'Premium Plan',
                amount: '$120.00',
                date: '06/10/2024',
                creditCard: 'xxxx xxxx xxxx 4321',
                status: 'Pending'
            },
            {
                position: 6,
                user: 'lmartinez',
                plan: 'Basic Plan',
                amount: '$85.00',
                date: '07/10/2024',
                creditCard: 'xxxx xxxx xxxx 5678',
                status: 'Solved'
            },
            {
                position: 7,
                user: 'cperez',
                plan: 'Pro Plan',
                amount: '$150.00',
                date: '08/10/2024',
                creditCard: 'xxxx xxxx xxxx 1234',
                status: 'Cancelled'
            },
            {
                position: 8,
                user: 'mbrown',
                plan: 'Basic Plan',
                amount: '$85.00',
                date: '09/10/2024',
                creditCard: 'xxxx xxxx xxxx 8765',
                status: 'Solved'
            },
            {
                position: 9,
                user: 'agarcia',
                plan: 'Premium Plan',
                amount: '$120.00',
                date: '10/10/2024',
                creditCard: 'xxxx xxxx xxxx 3456',
                status: 'Pending'
            },
            {
                position: 10,
                user: 'rlopez',
                plan: 'Pro Plan',
                amount: '$150.00',
                date: '11/10/2024',
                creditCard: 'xxxx xxxx xxxx 6789',
                status: 'Solved'
            },
            {
                position: 11,
                user: 'vhernandez',
                plan: 'Basic Plan',
                amount: '$85.00',
                date: '12/10/2024',
                creditCard: 'xxxx xxxx xxxx 2345',
                status: 'Solved'
            },
            {
                position: 12,
                user: 'jgonzalez',
                plan: 'Premium Plan',
                amount: '$120.00',
                date: '13/10/2024',
                creditCard: 'xxxx xxxx xxxx 7890',
                status: 'Cancelled'
            },
            {
                position: 13,
                user: 'jsmith',
                plan: 'Pro Plan',
                amount: '$150.00',
                date: '14/10/2024',
                creditCard: 'xxxx xxxx xxxx 8901',
                status: 'Pending'
            },
            {
                position: 14,
                user: 'mwilson',
                plan: 'Basic Plan',
                amount: '$85.00',
                date: '15/10/2024',
                creditCard: 'xxxx xxxx xxxx 4567',
                status: 'Solved'
            },
            {
                position: 15,
                user: 'kdavis',
                plan: 'Premium Plan',
                amount: '$120.00',
                date: '16/10/2024',
                creditCard: 'xxxx xxxx xxxx 9876',
                status: 'Pending'
            }
        ])

        return {
            headersPayments,
            payments
        }
    }
}


</script>