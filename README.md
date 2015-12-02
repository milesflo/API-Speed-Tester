# API-Speed-Tester

## Overview
I made this project in order to familiarize myself with AJAX. When user pressed "Connect to x", a fixed amount (Default 150) of ajax requests are sent to the respective API. For __each__ of these requests, a timestamp is created on send, and a second is created when it is successfully returned. The difference in milliseconds for that single request is pushed to an array, where all differences are then averaged. Other data points include successful connections, failed connections, successful connect percentage, and if rate limiting is, or at least appears to be present.

This project is interesting because it explores how different popular APIs handle a sudden burst of traffic.

## TO-DO
 *  Store output in a database
 *  (properly) Fix app-breaking button-spam bug.
 *  Record average packet size
 *  !! Allow users to search and add their own API's within the app