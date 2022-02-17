# signature-generator

Email signature generator for 2U and GetSmarter email signatures.<br><br>

### Useful links

 - [Production/live version](https://getsmartergraphics.s3.us-west-2.amazonaws.com/GS+email+signatures/Email+signature+tool/index.html) (AmazonS3 > getsmartergraphics > GS email signatures > Email signature tool)
 - [Staging version](https://getsmartergraphics.s3.us-west-2.amazonaws.com/GS+email+signatures/Email+signature+tool+-+staging/index.html?updated=true) (AmazonS3 > getsmartergraphics > GS email signatures > Email signature tool - staging)
 - [On 2Universe](https://2universe.2u.com/employee_resources/2ubrandportal~2/employee_assets/emailsignaturegenerator)
     - The production/live version of the signature generator is loaded into the 2Universe page with an `<iframe>` HTML element, so when the file on AWS is updated, the version on 2Universe is also automatically updated.<br><br>

### File structure

- `index.html`
- `README.md` Basic documentation (The file that you are reading right now)
- `dist/`
    - `files/` Input files and signature files for each type of signature (acts as components)
    - `img/` Images used in tool
    - `css/`
        - `app.scss` CSS source file written with SCSS/SASS
        - `app.css` Compiled CSS file for production
    - `js/`
        - `modules/` Functions used in tool
        - `state/` Functions handling the `user` object
        - `index.js` Entry file handling all document `events`<br><br>

### Information

##### Images

- The images used in the tool **use absolute URLs** (`https://www.site.com/imges/img.jpg`) and not relative URLs (`./imges/img.jpg`). Otherwise, the images will not load outside of the tool. 
- URLs for images in siganatures that cater for SalesForce (SF) use shortened URLs. This is important because SF has a character limit of 1333 characters in their email signatures. These include spaces, line-breaks and punctuation. If long URLs are used then the amount of characters will always be over the limit, which will render the signature unusable.


##### Components (HTML files)
- The `<input>` elements and signature `<table>` elements (encapsulates a signature) live in their own HTML files at `./dist/files/`.
- Each file serves as a web components and is loaded dynamically with a `fetch()` call.
- These files are separated from the rest of the tool because they are the ones that are updated when new features are added. With them seperate, they can be updated and/or changed without affecting the structure of the tool or any other files. 
- This also makes it easier to allow for optional details, because the DOM structure of a signature can be modified without having to reset it. This is because the component is automatically reset every time it gets loaded/mounted.<br><br>
