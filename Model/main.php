<section class='display main'>
  <section class=container>
    <div class=check></div>
    <h3>Color</h3>
    <div class=line></div>
    <section class='prev arrow'></section>
    <section class=color-frame>
      <section class=color></section>
    </section>
    <section class='next arrow'></section>
    <p class=info>Click new to fill with random color.</p>
  </section>
</section>

<section class='control main'>
  <section class=container>
    <section class=buttons>
      <span class='button new'>New</span>
    </section>
    <section class=fields>
      <h3>Ranges</h3>
      <fieldset class=hue>
        <legend>Hue</legend>
        <div class='field lower'>
          <label>Lower Limit:</label>
          <input type=text size=3 value=0>
        </div>
        <div class='field upper'>
          <label>Upper Limit:</label>
          <input type=text size=3 value=359>
        </div>
        <p>Hue is, for the most part, synonymous with what is to refered to as color. The legal range for it is 0 to 359, and represents a color wheel. The primary colors, being red, green and blue, are located at the values of 0, 120, and 240 respectively. The values 240 to 359 wrap back around to red giving you all the colors in between red and blue. Therefore, a lower limit of 10, and an upper limit of 350 will return different colors than a lower limit of 350, and an upper limit of 10.</p>
      </fieldset>
      <fieldset class=sat>
        <legend>Saturation</legend>
        <div class='field lower'>
          <label>Lower Limit:</label>
          <input type=text size=3 value=25>
        </div>
        <div class='field upper'>
          <label>Upper Limit:</label>
          <input type=text size=3 value=100>
        </div>
        <p>Saturation is expressed as a percentage, and as such, the legal range is 0 to 100. Saturation defines a range from pure color, which is 100, to gray, which is 0 at a constant lightness level. When a color is desaturated, it will appear dull, less colorful or washed out, but the color will also give the impression of being softer.</p>
      </fieldset>
      <fieldset class=lig>
        <legend>Lightness</legend>
        <div class='field lower'>
          <label>Lower Limit:</label>
          <input type=text size=3 value=20>
        </div>
        <div class='field upper'>
          <label>Upper Limit:</label>
          <input type=text size=3 value=80>
        </div>
        <p>Lightness is also expressed as a percentage, and it's legal range is 0 to 100. This property allows you to have what is called tints and shades. By having this number between 51 and 100, you are taking the base color, and adding white to it. This makes it a tint. The same is done between 0 and 49, but with black. This is referred to as a shade.</p>
      </fieldset>
    </section>
  </section>
</section>
