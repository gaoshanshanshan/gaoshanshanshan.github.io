---
title: 函数节流与防抖
date: 2018-11-19 16:59:03
tags:
categories:
  - JavaScript 
---

# 函数节流与防抖

---

## 函数节流

> &emsp; 当达到了一定的时间间隔就会执行一次。比如水龙头，我们想让水龙头每隔5s中滴一滴水，而不是无限制的滴水，限制了滴水的频率。

 &emsp;试想一下，当你在页面中监听了window.onresize事件，并且在事件中进行了大量的DOM操作，其高频率的操作可能导致浏览器的崩溃。因为DOM操作比起非DOM操作需要更多的内存和CPU时间。为了绕开这个问题,你可以使用定时器对函数进行节流。

&emsp; 函数节流的基本思想是，某些代码不能在没有间断的情况连续执行。第一次调用函数时，创建一个定时器，在定时器指定的时间后执行代码。第二次调用函数的时候，它会清除前一次的定时器并重新设置一个。如果前一个定时器已经执行过了，这个定时器就没有意义。如果没有执行,其实就是将其替换为一个新的定时器。目的是在一段时间内只会执行一次函数。看下面示例代码：

```
function throttle(method,delay){
    let throttle_id;
    return function(){
      if(throttle_id) return;
      throttle_id = setTimeout(()=>{
        method.apply(this,arguments) 
        clearTimeout(throttle_id)
      },delay)
    }
}

```
&emsp; throttle函数接受两个参数：要执行哪个函数以及延迟多长时间执行。当调用throttle函数时会返回一个匿名函数，匿名函数中对需要执行的函数进行了一次定时器的包裹。当第一次执行匿名函数的时候，会创建一个定时器，延时执行被包裹的函数，并将定时器的引用保存在了闭包中。当再一次调用匿名函数的时候，就会判断定时器的引用是否存在，如果引用还在（包裹的函数未执行），就不会继续向下执行。


## 函数防抖

> &emsp; 在一定时间内重复调用一个函数，只执行一次。比如按压弹簧，在放手前一直按压都不回弹，只有在防守的时候才会回弹。

&emsp;常见的场景是，当有一个注册页面，其中用户名的字段不能重复的时候。为了更好的体验，我们通常是在用户输入的过程中异步的去检查用户名是否存在。而用户不停的输入，就会不断地发起校验，造成接口资源的浪费。此时，我们就可以使用防抖函数：

```

function debounce(method,delay){
		let debounce_id;
		return function(){
			clearTimeout(debounce_id)
			debounce_id = setTimeout(()=>{
				method.apply(this,arguments) 
				clearTimeout(debounce_id)
			},delay)
		}
	}

```

&emsp; 防抖函数与节流函数原理类似。不同的是，防抖在一定时间内重复调用函数，会重新创建定时器。



