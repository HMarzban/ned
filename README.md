
## Ned Library
Ned is: a Super Light VanilaJS library with the ability of the big frameworks for creating a single-page web Application. It gives your application Component and Module features for longer maintainable and scalable project support without worry about the complexity of your project in the feature.

Ned come with Cli so you can run `npm i -g ned-lib-cli` and use command line to manage you project.


## How start project with Ned:

1. `npm i -g ned-lib-cli`  install ned library cli for manage better your application.
2. `ned new <projectName>` creat blank/starter project, more info visit the <a href="https://github.com/HosseinMarzban/ned-cli">ned-cli repo</a>
3. File tree of your project
4. Project Configuration
5. Add Router
6. Add Component
7. Add Module
8. Serve and develop project
9. Deploy your project for server target


### 3. Project File tree
This project tree belongs to ned-seed:

```bash|-- undefined
    |-- .gitignore
    |-- app.js
    |-- directoryList.md
    |-- LICENSE
    |-- nodemon.json
    |-- package-lock.json
    |-- package.json
    |-- README.md
    |-- app
        |-- src
            |-- favicon.ico
            |-- index.html
            |-- ned.config.js
            |-- assets
            |   |-- img
            |   |-- js
            |   |   |-- jquery-3.3.1.min.js
            |   |   |-- main.script.js
            |   |   |-- ned_bundle.js
            |   |   |-- ReadyStage.js
            |   |-- style
            |       |-- main.style.css
            |-- components
            |   |-- header
            |       |-- header.component.page.html
            |       |-- header.component.script.js
            |       |-- header.component.style.css
            |-- pages
                |-- about
                |   |-- about.route.page.html
                |   |-- about.route.script.js
                |   |-- about.route.style.css
                |-- home
                    |-- home.route.page.html
                    |-- home.route.script.js
                    |-- home.route.style.css
```

### Project Configuration

In `./app/src/` we have a file with the name of `ned.config.js`. with this file `cli` and project dependency injection logics set and handle.
We have a property called `static`, all static files you want to be loaded in first and in global you have to put in there,`head` and `body` its location of your dependency injection loaded, be careful about your priority of injection.

```javascript
    static: {
        script: {
            head: [],
            body: [],
        },
        style: {
            head: [],
            body: [],
        },
    },
```

### 5. Add Router

If you want to add a new route you can simply run `ned add` command and chose `router`, then cli ask for the name of your router which must be unique otherwise gives you a warning. After all, if router created successfully cli gives you help with the code you need in your script:

```bash
[Ned Cli]: Don. Router "profile" added successfully."
[Ned Cli][Help]:You can now copy and paste router config below on your application.

//Put this config in your script/js:

app.router.add('/profile',{
	name:  "profile Page",
	html:  "./pages/profile/profile.route.page.html",
	style: "./pages/profile/profile.route.style.css",
	script:"./pages/profile/profile.route.script.js",
	controller: function(){ 
		/*console.log("/profile router loaded")*/ 
	}
});

//Put this tag in your static/html:(use just once in application)
<app-root></app-root>
```

Each router has two controller witch firsts one is in the main inline config and the other one is in the script file which you can use it like below:

```javascript
app.router.controller(function(){ 

	var _self = this;

}); // @router.controller()
```

Note: all scripts when loaded in Dom object remain, even we remove the script tag so, Ned, after the first-time script loaded to handle it inside of the controller and for the second one just invoke the controller and rerun the script again. So all scripts must be in the controller till Ned runs it after call route.

in the controller and in call-site, you have some feature through `this`, if you console out `this` it gives you these info/data:

```javascript
[Object]:{
	info: {
		name: "About Page",
		html: "./pages/about/about.route.page.html",
		style: "./pages/about/about.route.style.css",
		script: "./pages/about/about.route.script.js",
		controller: ƒ
	},
	module: {add: ƒ, init: ƒ},
	pubsub: {events: {…}, on: ƒ, off: ƒ, emit: ƒ},
	reload: ƒ (),
	state: {
		lastPath: "/",
		path: "/about",
		name: "About Page",
		location: "/about",
		domain: "http://localhost:600"
	},
	__proto__: Object
}
```
You can get static info from `info` prop even you can invoke your inline router controller,
through each router and component you can create a module ,
by `pubsub` you can have published/subscribe strategy to access your data entire your project, 
and `reload` prop gives  you the ability to reload and re-render your current router for your usage proposes.

### 6. Add Component
If you want to add a new component you can simply run `ned add` command and chose `component`, then cli ask for the name of your component which must be unique otherwise gives you a warning. After all, if component created successfully cli gives you help with the code you need in your script:
```bash
[Ned Cli]: Don. Component "footer" added successfully."
[Ned Cli][Help]:You can now copy and paste component config below on your application.

//Put this config in your script/js:
app.component.add('component-footer',{
	html:  "./components/footer/footer.component.page.html",
	style: "./components/footer/footer.component.style.css",
	script:"./components/footer/footer.component.script.js",
	controller: function(){ 
		/*console.log("<component-footer></component-footer> component loaded")*/
	}
});

//Put this tag in your static/html:
<component-footer></component-footer>
```
like router, each component has two controller witch firsts one is in the main inline config and the other one is in the script file which you can use it like below:

```javascript
app.component.controller(function(){ 
	var _self = this;
}); // @router.controller()
```
Note: all scripts when loaded in Dom object remain, even we remove the script tag so, Ned, after the first-time script loaded to handle it inside of the controller and for the second one just invoke the controller and rerun the script again. So all scripts must be in the controller till Ned runs it after call route.

in the controller and in call-site, you have some feature through `this`, if you console out `this` it gives you these info/data:

```javascript
[Object]:{
	module: {add: ƒ, init: ƒ},
	pubsub: {events: {…}, on: ƒ, off: ƒ, emit: ƒ},
	reload: ƒ (),
	state: {
		lastPath: "/",
		path: "/",
		name: "Index Page",
		location: "/",
		domain: "http://localhost:600"
	},
	__proto__: Object
}
```
through each router and component you can create module <a href=""> see add module </a>,
by `pubsub` you can have published/subscribe strategy to access your data entire you project.

### 7. Add Module

The module is a small part of `component` or `router` which might repeat more than once in their target.
For add, a new module to your project run `ned add` then chose `module` after this part cli need a target of your module witch to be a router or component, at last, cli gives a list of your component or router base on your chose ,and you should select one of the existing targets, at the end cli gives you help code like below:
```bash
[Ned Cli]: Don. Module "chart" added successfully."
[Ned Cli][Help]:You can now copy and paste module config below on your route/componet.controller() application.

//Put this config in your script/js controller:

app.router.controller(function(){
	/*.......Rest of Your Code......*/
	this.module.add({
		tag:   "module-chart",
		html:  "./pages/profile/modules/chart/chart.module.page.html",
		style: "./pages/profile/modules/chart/chart.module.style.css",
		script:"./pages/profile/modules/chart/chart.module.script.js",
	});

	/*.......Don not forget, after module configuration initial module.......*/

	this.module.init();

	/*.......Rest of Your Code......*/
});

//Put this tag in your static/html:
<module-chart></module-chart>
```

As cli mention config of module must be in `router/component.controller()` and do not forget to pass `this.module.init();`. in the top example module chart tag `<module-chart></module-chart>` must be in that target(component/router) HTML file and each module you define just belong that target and you can not use somewhere else.
in module `script` file you can call module controller like below

```javascript
app.module.controller(function(){ 
	var _self = this;
}); //@module.controller()
```

In the controller and in call-site, you have some feature through `this` if you console out `this` it gives you these info/data:

```javascript
[Object]:{
	pubsub: {events: {…}, on: ƒ, off: ƒ, emit: ƒ},
	state: {
		lastPath: "/",
		path: "/",
		name: "Index Page",
		location: "/",
		domain: "http://localhost:600"
	},
	__proto__: Object
}
```
one more thing remind each module tag has their own controller, for invoking their controller you can act like below:

```javascript
app.module.controller(function () {

    let chart = document.getElementsByTagName('chart-static');

	chart[0].controller(function () {
		var _self = this;
		_self.element.querySelector('.head').innerHTML = `Module1: <b> ${_self.element.tagName} </b>`
	});

	chart[1].controller(function () {
		var _self = this;
		_self.element.querySelector('.head').innerHTML = `Module2: <b> ${_self.element.tagName} </b>`
	});
		
}); // @module.controller()
```

in this example we have a module with the name of `<chart-static></chart-static>` so we get all these tags as an array with the variable name of `chart`, now you can point each index if chart tag and get property of `controller`.
in this `controller` call-site you can get these properties:
```javascript
[Object]:{
	pubsub: {events: {…}, on: ƒ, off: ƒ, emit: ƒ},
	state: {lastPath: "/", path: "/", name: "Index Page", location: "/", domain: "http://localhost:600"},
	__proto__: Object
}
```


## How use it

In the  `./app/src/index.html` file, where `DOMContentLoaded` Block, add your Script files URL you wanna load in "scripts" Array variable, this `eventListener` load script in `<head/>` tag .

``` javascript
let  scripts = [
	"assets/js/jquery-3.3.1.min.js",
	"assets/js/ned_router.js",
	//put your script address here.
	..
	..
];
```

In the `main.script.js` file you can add your Route/Component and control all your base functionality.

## router example:
``` javascript
	/** 
	*	Path: ./app/src/assets/js/main.script.js 
	*	Description: load and config your Base router and component.
	*				 Sugest put this in Global Scope,for access it through 
	*				 Entire Project.
	*/
	
	let app  =  Router();
	
	app.config({
		//config properties
	});
	
	/**
	*	How add Route?
	*	you can add router in two way, one 'bind' or 'multiple' bind
	*/

	//One bind way:
	app.addRoute('/',{
		name:"Dashboard Page",
		html:"./pages/home/home.page.html",
		script:"./pages/home/home.script.js",
		style:"./pages/home/home.style.css",
		controller: homePageController
	});
	
	//Multiple bind way:
	app.addRoute({
		'/posts':{
			name:"posts Page",
			html:"./pages/posts/posts.page.html",
			script:  "./pages/posts/posts.script.js",
			style:"./pages/posts/posts.style.css",
			controller:function(){ 
			
					console.info("/products controller loaded") ;
			}
		},
		'/posts/archive':{
			name:"archive Page",
			html:"./pages/posts/archive/archive.page.html",
			style:"./pages/posts/archive/archive.style.css"
			script:"./pages/posts/archive/archive.script.js"
		}
	});
```
### `config()` options:
``` javascript
app.config({
	// html attribute for  'a' tag watch for routing.
	customAttributeNavigate:"ndHref", 
	
	//custom tag to load route data.
	root:"app-root",
	
	// Defualt root invoke for first load.
	defualtRoot:'/'        			  
});
```
**property**      | **default** 
---         | ---
root   | `app-root`
defualtRoot   | `/`
customAttributeNavigate   | `ned-href`


`customAttributeNavigate` and `root` usage in `html`:
``` html
<a href="/posts/archive" ndHref> Posts Archive </a>
<a href="http://www.google.com"> Google Search </a>

<!-- after config 'root' you should add manualy your root tag in body of your html -->
<app-root></app-root>
```

### `addRoute()` options:
beside on `name`, `html`, `style`, `script` properties you add `controller` and `guard` properties witch are function.

#### `controller()`:  
`controller` function invoke after page load, you can access some functionality throw `this` in call-site .
``` javascript
[Object]:{
	reload: ƒ reload(),
	state:{ path:"/", name:"Dashboard Page",location:"/",domain:"http://localhost" }
}
```
`reload()`, reload or better say Re-render again route base on current router state.

#### `guard()`:  
`guard` function invoke before route/state start to change, this function usage for authentication user before allow to switch target route. it base "promis" so route can wait till your ajax resolve.

``` javascript
app.addRoute('/user/dashboard'{
	html:"./pages/user/dashboad/dashboard.page.html",
	guard: DashboardGard,
	controller: DashboarController
});

const DashboardGard = function(){
	return new Promise(function(resolve, reject){
	
			setTimeout(function() {
				resolve(false); /* or */ resolve(true);
			}, 4000);
			
	});
}; //@Function: dashboardGard()

const DashboarController = function(_err){
	// if gard resolve with false, first parameters give you Object error
	if(_err)
		throw  new  Error(_err.message);

}; //@Function: DashboarController(err)
```
Some time you want put your all codes in route external script file and execute it in block execution function, to approach this scenario you put `app.route()` in global variable. then you can access its own proprety in local block. so in script when your file loaded you can  invoke `controller` function:
``` javascript
/** 
*	Path: ./app/pages/user/dashboard/dashboard.script.js
*  	Description: user Page script dependency injection. 
*/

app.controller('/user/dashboard',function(){

	console.info(this);
	
	//your Page Logic controller codes.
	..
	..
	
}); //@Function: userDashboard Controller
```
Also through `this` in controller function you can access this properties:
``` javascript
[Object]:{
  name:  "Dashboard Page",
  html:  "./pages/home/home.page.html",
  script:  "./pages/home/home.script.js",
  style:  "./pages/home/home.style.css",
  state: {path:"/", name:"Dashboard Page", location"/",domain:"http://localhost:600"},
  controller:  ƒ (),
  module: {store:  {…},  add:  ƒ,  initial:  ƒ},
  reload:  ƒ reload() // reload current state
 }
```
each `controller` and `component` through `this` in access you to create `module`,
`module` it small piece of your component for tears down you component in small piece and functionality and better maintaining your application.
`module` load after component loaded completely.

#### How create new `module`?
``` javascript
/** 
* Path: ./app/pages/user/dashboard/dashboard.script.js 
* Description: user Page script dependency injection. 
* How we can creat new module?
*/
app.controller('/user/dashboard',function(){
	let _self = this;
	
	this.module.add({
		tag:"chart-static",
		html:"./pages/home/chartLine.module/chartLine.index.module.html",
		script:"/pages/home/chartLine.module/chartLine.script.module.js",
		style:"/pages/home/chartLine.module/chartLine.style.module.css",
		//controller:chart_staticController
	})
	
	//your Page Logic controller codes.
	..
	..
	
}); //@Function: userDashboard Controller

```
As description of module, we can have more than one tag of module so we can access it by controller for each tag:
``` javascript
	let  chart  =  document.getElementsByTagName('chart-static');
    console.log(chart) // it gave me array of tags
	
	//or
	document.getElementsBytagName('chart-static')[0].controller(function(){
		//do your login for first module tag
		//for access more functionality you can use "this" for like: 
		//PubSub and so on.
	});

	chart[0].controller(function(){
		var  _self  =  this
		chart[0].innerHTML  =  "chart-static one";
	});

	chart[1].controller(function(){
		var  _self  =  this;
		chart[1].innerHTML  =  "chart-static two";
	});

	chart[2].controller(function(){
		var  _self  =  this;
		chart[2].innerHTML  =  "chart-static three";
	});
```
througth `this ` in controller you can access these object:
//////=================>to be continue.
## Component
coming soon

## Module
coming soon

## Run
`npm start`

## How to use in real world project?
coming soon


## How Ned Library work?
coming soon






what's next:
Add `cli` for controller better  project.
Develop  and add `compponet`, `module & plugin` features, for tears project in small pieces for clear and maintable continuous development. 
Develop in Es6 and maybe in Typescript.
and so good and useful feature.

Better mention,  I do not plane to add engine template, just router and component. And for DOM manipulation you can use JQUERY or VanilaJs ( JS native ) or what ever library exist for manipulating DOM .





## The story behands of Ned library

I like SPA application and always inspire it how can we control all our applications in just on one page. Now a time we have a lots of libraries and frameworks out there like Ember.js, Angular, React, Vue.js and so on. All these are awesome and admirable.

But some aspects of these frameworks really butter me through these years and it is the new version with new change look features! It's the duty of programmers being on the edge of learning, but in this case, it is too hard and time-consuming to adapt and find out the new concept of frameworks to our existing project and update or migrate our project to the Major version of them.

Let me bring out example, when I familiar with SPA framework, there were no more chosen, so I chose angular, I start from angular 1.2 to 1.4.6, It was so good and give me the ability to bring out my complex logic to front-end without any complexity or worry about feature maintenance. I developed continuously for almost 4 years during these year lunches and developed lots of applications with the angular legacy, and everything was awesome, till I came to myself and realized we have a bunch of cool and awesome frameworks with big and growing community out there.

So I start learning the new version of the angular witch came with typescript. In the first releasing it was great, but after a while when the new major version comes out, it becomes a headache and its really drive me crazy and I can not tolerate these bunches of changes for my applications. (and these major changes coming out continuously)

Meanwhile, I looked up to the other options like React or Vue.js, these two are really amazing, but still have that kind of issue I had with new angular, the issue is communicating and work with the old concept of plugins or components written before them.

It is right, and we have to accept it, we have a lot of plugins, widgets, and components out there that's written and continually developing with jQuery or native script. So if we want to use one of them in those frameworks, we have to change the structure of these useful plugins to a base of target framework and it's really painful in some cases and more importantly, a time consuming especially when your boss need project in short time.

So, for me as an old fashion developer, it's really hard to migration and learning and makes time to make changes for all plugin witches written in jQuery to Vue.js or React.

In the other painful things is the fight of which of these frameworks better than the other and it's really hard to choose between these good frameworks.

After all, I decided to get rid of this situation, so I start to develop a library witch just handle Router of SPA and have ability to tear out an application on parts, to approach this concept this library comes with component and module parts just for manage these tears parts of your application.

always want controller my own dependency injection like `style` and `script` and when route change remove all back injection and load just that rout dependencies i invoke it. 