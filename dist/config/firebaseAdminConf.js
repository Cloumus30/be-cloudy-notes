"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseAuth = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
// const serviceAccount = JSON.stringify(firebaseAccount);
const firebase = firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert('./cloudy-note-firebase.json'),
    databaseURL: "https://sample-cloudy-default-rtdb.asia-southeast1.firebasedatabase.app"
});
exports.firebaseAuth = firebase_admin_1.default.auth(firebase);
// const jwt = firebaseAdmin.auth(firebase).verifyIdToken('eyJhbGciOiJSUzI1NiIsImtpZCI6IjFlOTczZWUwZTE2ZjdlZWY0ZjkyMWQ1MGRjNjFkNzBiMmVmZWZjMTkiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQ0lFTCIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BR05teXhhQTk4UEtmb0RlWXFhUUxvTE80dkprekpLM3JtQjF0NnpOZkNsZD1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9zYW1wbGUtY2xvdWR5IiwiYXVkIjoic2FtcGxlLWNsb3VkeSIsImF1dGhfdGltZSI6MTY3OTQzOTc4NCwidXNlcl9pZCI6IlFnZ0c3cEN6R1JTeXVuYk1QOFl6Nk1kUDZkaTEiLCJzdWIiOiJRZ2dHN3BDekdSU3l1bmJNUDhZejZNZFA2ZGkxIiwiaWF0IjoxNjc5NDM5Nzg0LCJleHAiOjE2Nzk0NDMzODQsImVtYWlsIjoiZGFuYWdhbWVzMzBAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTQ5NDUxMjc2MzA2NDExMDQyNjciXSwiZW1haWwiOlsiZGFuYWdhbWVzMzBAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.Z6qCBil62EXHgTniQqO3nZHUgxFFyeDc7O1vvQB1CmcMAF-hYAeteFhkinQYUUIpql6dlt-4eLbQyMfwyrYpqPEnDEEQbQCYxz6kucbJx7d5fBhTslFv2YWjAVRVP3qKtDiQvwD0ye3qt_u4xgp7KKQKaFHmaVcWD0bseYvgX_NwlSrqgm70_y_wQcfWqwMRYiHIHkf2Vmg94-7ujO4IDA97QDGV2TdO8yruf-MLtBAboTCOhoefomok5hKVTrDL8DrhMxQQQsI44H8LbGx0UwIVVx0yAVtWxshBiXRgZcd-eq-8DHBcEQfhlVQEbf0z2VEptFiyv04tUOS2AOO5OA')
//     .then((res) => console.log(res));
// // console.log(jwt);
