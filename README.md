# Power Pages Framework Experiments
This repository contains a collection of experiments on JavaScript frameworks working in Microsoft Power Pages.

## TL;DR
As of this writing (2/21/2025), none of these options are officially supported by Microsoft.

What is supported by Microsoft is the [PCF framework](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/overview), which can tie directly into your Dataverse data.

[Alpine JS](https://alpinejs.dev/) is the best fit I've found for developing custom UI components on Power Pages. 

## Experiments
For each different framework, I built a basic counter app, that includes buttons for incrementing and decrementing the counter. The app displays the current value of the counter, and the value of the counter doubled. I'm writing this out in the order I tried them. I was able to get all of these to work in Power Pages, but some of them required a lot of work to do so. What follows is the narrative of my progression through the frameworks.

### Solid
[Solid](https://www.solidjs.com/)

I think Solid is a great framework, I love their approach to reactivity, it's super fast, and it's a pretty good developer experience.

That said, Solid was the biggest headache in the Power Pages framework experiments (starting off strong). It does compile to vanilla JavaScript, but it also requires a build step, and it requires configuration. It took me quite a bit to get the right combination of configuration options to make it work. I had to build the component code with `npm run build` and then manually copy the compiled code into a script tag in my HTML that went to the Power Pages Web Template record. This created a really large Web Template record.

I mean no offense to Solid, as I think it's an excellent framework, but it is not a good fit for the unique case of Power Pages. 

### Vanilla
[Building Signals](https://www.youtube.com/watch?v=t18Kzj9S8-M)

In the vanilla JavaScript experiment, I built a small library that implemented signals. I then uploaded that library as a Power Pages Web File record, and then included it in the HTML page for the counter app. This worked, but it was a bit of a hack.

The purpose of this experiment was to see how practical it would be to make a library that was purpose-built for Power Pages.

This was a bad idea.

It took a lot of configuration to get the library to talk to the Power Pages Web Template record. It did eventually work, but I can't recommend building your own framework for Power Pages. This led me to thinking, since Web Templates really only work with HTML, why not use a framework that integrates tightly with HTML?

### Vue
[Vue](https://vuejs.org/)

That question led me to Vue. Vue was also a bit of a headache to get working in Power Pages, but once I figured out the quirks, it worked fine. I can kind of recommend Vue for serious projects in Power Pages, but I would also recommend asking yourself if putting a large-scale Vue app inside a Power Pages site is really a good idea for your project.

Vue also required a bit of configuration. Because the Power Pages Web Template setup recognizes Liquid tagging, that created an issue with using Vue. Both Vue and Liquid use double mustache brackets `{{ }}` for variable interpolation. This would confuse whatever compiles a Power Pages site and it wouldn't put anything in the spots where the variables should be. Vue does allow you to change the delimiters, which I did (`${}` worked just fine), but having to do that manually on every project would be a pain. 

After trying Vue, I remembered that I had used Alpine to build my personal website, and that it works pretty seamlessly inside HTML. So I decided to give Alpine a try.

### Alpine
[Alpine](https://alpinejs.dev/)

Alpine is the most seamless framework I've tried for building custom components in Power Pages. It requires no build step, it requires no configuration, and all you need to do is add a script tag to your page with the proper URL for the framework's source code.

Alpine also allowed me to build the component quickly and easily. I had spent at least 2 hours on each of the different frameworks I tried before Alpine, doing a mix of configuration and coding, and a lot of trial and error.

I built the Alpine component in 12 minutes, and it worked perfectly. Dropping it into Power Pages was also quite easy, as it all happens in one HTML file.

Here's the entirety of the Alpine component:
```
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

<div x-data="{count: 0}">
  <h1>Hey Alpine!</h1>
  <button x-on:click="count++">Increment</button>
  <button x-on:click="count--">Decrement</button>
  <p>
    Count: <span x-text="count"></span>
    </p>
  <p>Doubled: <span x-text="count * 2"></span></p>
</div>
```

For those keeping track at home, that's 11 lines of code. In Vue I was able to do the same thing in about 60. Solid was about the same as Alpine, at roughly 15 lines, but actually getting it to work as a Web Template component was a bit of a pain. Between my library code and the component code, the vanilla JavaScript version was about 55 lines of code.

Alpine is the most efficient in terms of amount of code, and is also the easiest to get working in Power Pages.

## Other Frameworks
### Svelte
[Svelte](https://svelte.dev/)

I like Svelte a lot. I have built a few projects with it personally, and I know it's a great framework for a lot of purposes. I did not try it in my experiments for Power Pages.

Similar to Solid, it builds down to vanilla JavaScript, but with the pain it was to wrangle that into a working Power Pages Web Template record with Solid, I decided Svelte wouldn't be a good fit for Power Pages, and honestly didn't try it. If you do try it and find it works well, let me know! I'd be happy to be wrong.

### React
[React](https://react.dev/)

I didn't try React in my experiments for Power Pages. I frankly don't know how to, or if you even can, compile React down to a format that you could get into a Web Template record for Power Pages. I know there are tools that do this, but if it requires additional steps, such as installing another npm package and configuring builds with it, I don't think it's worth it. I'm trying to avoid manual steps as much as possible.

If you do want to try using React in Power Pages, React is fully supported in the [PCF framework](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/overview), and you can [use PCFs on Power Pages](https://learn.microsoft.com/en-us/power-pages/configure/component-framework). The caveat with the PCF framework is that you have to tie it to a form field or dataset, but if that's what you're trying to do in the first place, it's a great option.

## What about PCFs?
Web Template components don't immediately tie into form fields or datasets in the way PCFs do. For some situations, that's pretty desirable. For others, it's not. If you are at all interacting with Dataverse data, just [use PCFs](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/overview). They are well documented by Microsoft, officially supported, and there is great tooling for them.

## Caveats
As previously mentioned, Web Templates components don't tie into form fields or datasets in the same way that PCFs do. If that's what you're trying to do, [use PCFs](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/overview). If you aren't worried about that though, you can pretty much do whatever you want (with the knowledge that this isn't officially supported by Microsoft).

Another major caveat is, as stated above, using JS frameworks in Web Templates is not officially supported by Microsoft. If you're using a JS framework in a Web Template, you're on your own. I stumbled upon this discovery while working on another project, and decided to do a deep dive to share with the community. I am not a Microsoft employee, and I don't work on the Power Pages product, so I cannot support you in any official capacity. But I'd be happy to answer questions within reason, please reach out using the contact form on [https://garrettpierce.dev/](https://garrettpierce.dev/).

## What about (insert framework here)?
I don't have that kind of time. It's a miracle that I had the kind of time to try all the ones listed above in the first place.

If you decide to try any additional frameworks and make any interesting discoveries, please reach out to me using the contact form on [https://garrettpierce.dev/](https://garrettpierce.dev/).

## When would you use this knowledge?
I dunno. I find Power Pages very useful for its purpose, but it is limited by design. It's not really supposed to be a full-featured website builder like Squarespace or even a full custom build, but you can do a lot with it. If you have a Power Pages site that needs functionality not offered out of the box, you could use a framework such as Alpine to build that functionality. You should see if you could do what you need within the bounds of a PCF first, and then consider using something like Alpine.
