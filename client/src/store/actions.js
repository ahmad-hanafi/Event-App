import axios from 'axios'
const baseURL = 'http://localhost:3000'
import Swal from 'sweetalert2'

export function login({ commit }, { email, password, router }) {
    const data = {
        email,
        password
    }
    axios
        .post(`${baseURL}/login`, data)
        .then(res => {
            localStorage.setItem('access_token', res.data.access_token)
            localStorage.setItem('roles', res.data.roles)
            router.push('/')
            Swal.fire(
                'Success',
                `Welcome Back ${res.data.username} !`,
                'success'
            )
        })
        .catch(error => console.log(error))
}

export function getEvents({ commit }) {
    axios
        .get(`${baseURL}/events`, {
            headers: {
                access_token: localStorage.access_token
            }
        })
        .then(res => {
            commit('SET_EVENTS', res.data)
        })
        .catch(error => console.log(error))
}

export function getEventByIdVendor({ dispatch }, { id, router }) {
    axios
        .get(`${baseURL}/events/${id}`, {
            headers: {
                access_token: localStorage.access_token
            }
        })
        .then((response) => {
            // commit('SET_EVENTBYID', response.data)
            function formatDate(date) {
                let result = new Date(date).toDateString();
                return result;
            }
            Swal.fire({
                title: `${response.data.name}`,
                html:
                    `Proposed Date : ` +
                    `<p> - ${formatDate(response.data.date1)}</p>` +
                    `<p> - ${formatDate(response.data.date2)}</p>` +
                    `<p> - ${formatDate(response.data.date3)}</p>` +
                    `Location : ` +
                    `<p>${response.data.location}</p>` +
                    `Status ` +
                    `<p>${response.data.eventStatus}</p>` +
                    `<p>${formatDate(response.data.createdAt)}</p>`,
                showCancelButton: true,
                confirmButtonText: `Approve`,
                cancelButtonText: `Reject`,
            }).then((result) => {
                let confirm = ''
                if (result.isConfirmed) {
                    const dateOne = formatDate(response.data.date1)
                    const dateTwo = formatDate(response.data.date2)
                    const dateThree = formatDate(response.data.date3)
                    const { value: date } = Swal.fire({
                        title: 'Select Confirm Date',
                        input: 'radio',
                        inputOptions: {
                          'date1': dateOne,
                          'date2': dateTwo,
                          'date3': dateThree,
                        },
                        showCancelButton: true,
                        inputValidator: (value) => {
                            if (!value) {
                              return 'You need to choose something!'
                            } else {
                                if (value === 'date1') {
                                  confirm = dateOne
                                } else if (value ==='date2') {
                                  confirm = dateTwo
                                } else if (value === 'date3') {
                                  confirm = dateThree
                                }
                                dispatch('addConfirmEvent', {
                                  eventID: id, 
                                  confirmDate: confirm, 
                                  confirmStatus: "Approve", 
                                  remark: 'See You There', 
                                  router: this.$router
                                })
                                Swal.fire('Success',`Thanks for your confirmation!`, 'success')
                            }
                        }
                      })
                      
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    const { value: reason } = Swal.fire({
                        title: 'Rejected for reasons',
                        input: 'text',
                        inputLabel: 'Your reason',
                        inputPlaceholder: 'ex: Have meeting, ...',
                        showCancelButton: true,
                        inputValidator: (value) => {
                            if (value.length <= 3) {
                              return 'You need to write your reason for rejection!'
                            } else {
                                dispatch('addConfirmEvent', {
                                  eventID: id, 
                                  confirmDate: '', 
                                  confirmStatus: "Reject", 
                                  remark: value, 
                                  router: this.$router
                                })
                                Swal.fire('Success',`Thanks for your confirmation!`, 'success')
                            }
                        }
                      })
                }
            })
        })
}

export function getEventByIdHR({ dispatch }, { id, router }) {
    axios
        .get(`${baseURL}/events/${id}`, {
            headers: {
                access_token: localStorage.access_token
            }
        })
        .then((response) => {
            // commit('SET_EVENTBYID', response.data)
            function formatDate(date) {
                let result = new Date(date).toDateString();
                return result;
            }
            Swal.fire({
                title: `${response.data.name}`,
                html:
                `Proposed Date : ` +
                    `<p> - ${formatDate(response.data.date1)}</p>` +
                    `<p> - ${formatDate(response.data.date2)}</p>` +
                    `<p> - ${formatDate(response.data.date3)}</p>` +
                    `Location : ` +
                    `<p>${response.data.location}</p>` +
                    `Status ` +
                    `<p>${response.data.eventStatus}</p>` +
                    `<p>${formatDate(response.data.createdAt)}</p>`,
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: `Approve`,
                denyButtonText: `Pending`,
            }).then((result) => {
                if (result.isConfirmed) {
                      dispatch('updateEventStatus', {
                          id: id, 
                          eventStatus: "Approve", 
                          router: this.$router
                      })
                      Swal.fire('Success',`Yeay, Let start !`, 'success')
                } else if (result.isDenied) {
                    dispatch('updateEventStatus', {
                        id: id, 
                        eventStatus: "Pending", 
                        router: this.$router
                    })
                    Swal.fire('Success',`Just wait and see. Hope it will be approve soon !`, 'success')
                }
            })
        })
}

export function addEvent({ commit }, { name, date1, date2, date3, location, router }) {
    console.log("masuk ke function")
    const addData = {
        name: name,
        date1: date1,
        date2: date2,
        date3: date3,
        location: location,
    }
    axios
        .post(`${baseURL}/events`, addData, {
            headers: {
                access_token: localStorage.access_token
            }
        })
        .then(response => {
            router.push('/')
        })
        .catch(error => console.log(error))
}

export function updateEvent({ state, dispatch }, { id, router }) {
    const dataUpdate = {
        name: state.event.name,
        date1: state.event.date1,
        date2: state.event.date2,
        date3: state.event.date3,
        location: state.event.location,
    }
    axios
        .put(`${baseURL}/events/${id}`, dataUpdate, {
            headers: {
                access_token: localStorage.access_token
            }
        })
        .then((response) => {
            dispatch('getEvents')
            router.push('/')
        })
        .catch((error) => console.log(error))
}

export function updateEventStatus({ dispatch }, { id, eventStatus, router }) {
    const dataUpdate = {
        eventStatus: eventStatus,
    }
    axios
        .patch(`${baseURL}/events/${id}`, dataUpdate, {
            headers: {
                access_token: localStorage.access_token
            }
        })
        .then((response) => {
            dispatch('getEvents')
        })
        .catch((error) => console.log(error))
}

export function deleteEvent({ dispatch }, { id, router }) {
    axios
        .delete(`${baseURL}/events/${id}`, {
            headers: {
                access_token: localStorage.access_token
            }
        })
        .then((response) => {
            dispatch('getEvents')
            router.push('/')
        })
        .catch((error) => console.log(error))
}


export function getConfirmEventHR({ commit }, {router}) {
    axios
        .get(`${baseURL}/events/confirmation/hr`, {
            headers: {
                access_token: localStorage.access_token
            }
        })
        .then(res => {
            commit('SET_CONFIRMEVENT', res.data)
            // console.log(res.data)
            router.push('/event/confirm')
        })
        .catch(error => console.log(error))
}

export function getConfirmEventVendor({ commit }, {router}) {
    axios
        .get(`${baseURL}/events/confirmation/vendor`, {
            headers: {
                access_token: localStorage.access_token
            }
        })
        .then((response) => {
            commit('SET_CONFIRMEVENT', response.data)
            // console.log(response.data)
            router.push('/event/confirm')
        })
        .catch(error => console.log(error))
}


export function addConfirmEvent({ dispatch }, { eventID, confirmDate, confirmStatus, remark, router }) {
    const addData = {
        confirmDate: confirmDate,
        confirmStatus: confirmStatus,
        remark: remark
    }
    axios
        .post(`${baseURL}/events/confirmation/${eventID}`, addData, {
            headers: {
                access_token: localStorage.access_token
            }
        })
        .then(response => {
            dispatch('getConfirmEventVendor')
            // router.push('/')
        })
        .catch(error => console.log(error))
}

export function deleteConfirmEvent({ dispatch }, { id, router }) {
    axios
        .delete(`${baseURL}/events/confirmation/vendor/${id}`, {
            headers: {
                access_token: localStorage.access_token
            }
        })
        .then((response) => {
            dispatch('getConfirmEventVendor')
            router.push('/event/confirm')
        })
        .catch((error) => console.log(error))
}
