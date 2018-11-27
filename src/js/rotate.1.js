/* global $ */
'use strict'

$(function () {
  let datagram =
    `<img class="blue blue1" src="./img/blue-full.svg"/>
    <img class="blue blue-arrow" src="./img/blue.svg"/>
    <img class="green green1" src="./img/green-full.svg"/>
    <img class="green green2" src="./img/green-full.svg"/>
    <img class="green green3" src="./img/green-full.svg"/>
    <img class="green green-arrow" src="./img/green.svg"/>
    <img class="gray" src="./img/gray.svg"/>
    <img class="circle" src="./img/circle.svg"/>`

  let segment = $('.datagram').attr('segment')
  let time = $('.datagram').attr('time')

  // $('.datagram')[0].innerHTML = datagram

  $('.datagram').empty().append(datagram)

  // _cons($('.datagram'))

  function _cons (...a) {
    console.log(a)
  }

  // rotate(65, 600)
  _cons(segment, time)

  // rotate(segment, time)

  function _deg (percent) {
    return 3.60 * percent
  }

  /* function createClass (obj, deg, time, delay) {
    _cons(obj)
    $(`<style type='text/css'>
    .animate-${obj}{
      transition-delay: ${delay}s
      transition-property: transform
      transform: rotate(${deg}deg)
      transition-duration: ${time}s
      transition-timing-function: linear
    }
    </style>`).appendTo('head')
  } */

  function doRotate (name, deg, speed, delay) {
    let time = deg / speed

    let obj = $(name)

    _cons(name)

    name = name.slice(1)

    // createClass(name, deg, time, delay)
    // obj.addClass(`animate-${name}`)

    // object.style.transition = "property duration timing-function delay|initial|inherit"
    obj.css({
      transitionDelay: `${delay}s`,
      transitionProperty: 'transform',
      transform: `rotate(${deg}deg)`,
      transitionDuration: `${time}s`,
      transitionTimingFunction: 'linear'
    })
  }

  function hideSector (name, time) {
    let delay = time * 0.8
    let obj = $(name)

    obj.css({
      opacity: 0,
      transitionDelay: `${delay}s`
    })
  }

  function rotate (percents, time) {
    let deg = _deg(percents)
    let speed = deg / time

    let s30 = _deg(30)
    let s50 = _deg(50) - 1 // fix for bugged arc size
    let s70 = _deg(70)
    let s80 = _deg(80)

    let lateSegmentDelay = 0.1

    _cons(speed, deg, time)
    if (percents > 0 && percents <= 100) doRotate('.blue-arrow', deg, speed, 0)
    if (percents <= 25) {
    } else if (percents <= 30) {
      doRotate('.blue1', 90, speed, lateSegmentDelay)
      doRotate('.blue-arrow', deg, speed, 0)
    } else if (percents <= 50) {
      doRotate('.green3', 90, speed, lateSegmentDelay)
      doRotate('.green-arrow', s30, speed, 0)
      doRotate('.blue1', s30, speed, lateSegmentDelay)
      doRotate('.blue-arrow', deg, speed, 0)
    } else if (percents <= 70) {
      doRotate('.green3', 90, speed, lateSegmentDelay)
      doRotate('.green-arrow', s50, speed, 0)
      doRotate('.blue1', 90, speed, lateSegmentDelay)
      doRotate('.blue-arrow', deg, speed, 0)
    } else if (percents <= 80) {
      doRotate('.green3', 90, speed, lateSegmentDelay)
      doRotate('.green2', 90, speed, lateSegmentDelay)
      doRotate('.green1', s50, speed, lateSegmentDelay)
      doRotate('.green-arrow', s70, speed, 0)
      doRotate('.blue1', 90, speed, lateSegmentDelay)
      doRotate('.blue-arrow', deg, speed, 0)
    } else if (percents <= 100) {
      doRotate('.green3', 90, speed, lateSegmentDelay)
      doRotate('.green2', s50, speed, lateSegmentDelay)
      doRotate('.green1', s70, speed, lateSegmentDelay)
      doRotate('.green-arrow', s80, speed, 0)
      doRotate('.blue1', s80, speed, lateSegmentDelay)
      doRotate('.blue-arrow', deg, speed, 0)
    }
    if (percents > 75 && percents <= 100) hideSector('.gray', time)
  }

  window.requestAnimationFrame(function () {
    rotate(segment, time)
  })
})
