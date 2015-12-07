# Sliding Content
This is a little thing that I made in my past time. What it does simply is to display content via. the act of sliding.

## Using it

### Dependencies

You can use the jQuery plugin in order to use it. So first, you'll have to add all the dependencies and JS and CSS files:

```
<link rel="stylesheet" type="text/css" href="../dependencies/waves.min.css">
<link rel="stylesheet" type="text/css" href="../sliding-content.css">

<script type="text/javascript" src="../dependencies/jquery-2.1.4.js"></script>
<script type="text/javascript" src="../dependencies/waves.js"></script>

<script type="text/javascript" src="../sliding-content.js"></script>
```

### HTML

Of course, you'll have to instatiate the sliding-content, but first, we'll have to work on the HTML structure first.

```
<div class="sliding-content" id="hi">
  <div class="content">
    ...
  </div>
  
  <div class="content">
    ...
  </div>
  
  <div class="content">
    ...
  </div>
</div>
```
Note the fact that every component has a class. The wrapper has a required class, which is `sliding-content`. Inside the wrappers is `x` amount of wrappers for the content in each slide and each wrapper has a class of `content`. If you want to, it can be any element, as long as it isn't something like a `span`. For example:

`<iframe src="[src]" class="content"></iframe>`

We can use an iframe as a "slide".

### Script

Now, we'll have to instantiate the slide. If you haven't noticed, one of the dependencies is jQuery and the `sliding-content` wrapper had a id of `hi`. So, we can just use the jQuery method:

`$("#hi").initSlide()`

It'll load up everything for you and you'll be ready to use.

### Parameters

The `.initSlide()` method takes in a JSON object as a parameter:

```

{
  name : {
    names : [..., ...],
    nameElement : $("")
  },
  autoSlide : [true/false],
  autoSlideTime : [int]
}

```

#### What the parameters do

The first parameter is `name`. Name is a function that Sliding Content has that enables you to have a element's ...

## NOTE:

The program is terrible in IE, and I have no idea why.
