
## Ned-Router
Super Light Router and Component Library with VanilaJS ( JavaScript Native ).
~~Base on `jquery` Library ( plane to change this dependency )~~.

I like SPA ( single-page application ) application and always inspire it how can we control our all application just in one page, now time we have a lot of library and framework like <a href="https://www.emberjs.com/">Ember</a>, <a href="https://angular.io/">Angular</a>,  <a href="https://reactjs.org/">react</a>, <a href="https://vuejs.org/">Vuejs</a> and so on, all these are awesome and admirable.
but...

It just start of Ned Library.
always want controller my own dependency injection like `style` and `script` and when route change remove all back injection and load just that rout dependencies i invoke it. 

### Featur Track in library:
 1. Router
 2. Module
 3. Component
 4. PubSub
 5. Mixing

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


## How Ned-Rout work?
coming soon






what's next:
Add `cli` for controller better  project.
Develop  and add `compponet`, `module & plugin` features, for tears project in small pieces for clear and maintable continuous development. 
Develop in Es6 and maybe in Typescript.
and so good and useful feature.

Better mention,  I do not plane to add engine template, just router and component. And for DOM manipulation you can use JQUERY or VanilaJs ( JS native ) or what ever library exist for manipulating DOM .

