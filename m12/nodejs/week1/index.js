const { sayHello, sayGoodbye } = require('../sayHello')
const fs = require('node:fs')

const express = require('express')

// import { sayHello, sayGoodbye } from './sayHello.js'

// sayHello('Alvaro')
// sayGoodbye('Alvaro')


fs.writeFile('test.txt', 'content', (error) => {
  if (error) {
    console.log('We got and error')
    
    return
  }

  console.log('File content written succesfully');
})

fs.readFile('test1.txt', (error) => {
  if (error) {
    console.log('We got and error')

    return
  }

  console.log('File content read succesfully');
})
