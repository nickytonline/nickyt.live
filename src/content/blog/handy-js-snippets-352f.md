---json
{
  "title": "Have a Handy JS Snippet You Want to Share?",
  "excerpt": "Quick ES5/ES6 snippets for doing awesome things in Javascript.",
  "date": "2018-01-23T01:07:14.326Z",
  "tags": [
    "javascript",
    "showdev"
  ],
  "cover_image": "https://www.nickyt.co/images/posts/_dynamic_image_width=1000,height=420,fit=cover,gravity=auto,format=auto_https%3A%2F%2Fc2.staticflickr.com%2F8%2F7282%2F8995095069_9e88b3bba5_b.jpg",
  "canonical_url": "https://www.nickyt.co/blog/handy-js-snippets-352f/",
  "reading_time_minutes": 2,
  "template": "post"
}
---

So it's pretty simple. I'm looking for **one or two lines of JavaScript** that do something useful.

I'll get the ball rolling and start with some examples:

- Shallow array clone via Array spread.

```javascript
const originalArray = [1, 2, 3];
const shallowArrayClone = [...originalArray];
```

- Shallow array clone via `Array.protoype.slice`.

```javascript
const originalArray = [1, 2, 3];
const shallowArrayClone = originalArray.slice();
```

{% twitter "908547800442404864" %}

- Shallow clone of an object via object spread.

```javascript
const originalObject = { a: 1, b: 2, c: 3 };
const shallowObjectClone = { ...originalObject };
```

- Shallow clone of an object via object spread with one property overridden.

```javascript
const originalObject = { a: 1, b: 2, c: 3 };
const shallowObjectClone = { ...originalObject, c: 45 };
```

- Get unique values of an array using `Set`

```javascript
const arrayWithDuplicateValues = [1, 2, 3, 3, 1, 5];
const uniqueArray = Array.from(new Set(arrayWithDuplicateValues);
```

or

```javascript
const arrayWithDuplicateValues = [1, 2, 3, 3, 1, 5];
const uniqueArray = [...new Set(arrayWithDuplicateValues)];
```

- See if two arrays have the same values (unordered and for primitive values).

```javascript
const a = [1, 2, 3];
const b = [2, 3, 4];

const uniques = new Set(a.concat(b));
const haveSameValues = uniques.length === a.length; // or uniques.length === b.length;
```

- Flatten an array with the ES spread operator and Array.prototype.concat. Great tip care of Jonathan Z. White.

{% twitter "985726458466263042" %}

```javascript
const arrayToFlatten = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
const flattenedArray = [].concat(...arrayToFlatten);
```

2020 Update for the above is

```javascript
[
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
].flatMap((x) => x);
```

And go!

Cover image care of Flickr user [Wayne Grivell](https://www.flickr.com/photos/56462773@N07/8995095069/in/photolist-eGSdo2-eVj8Xm-F7SDKj-gyziYJ-5GmieA-aQjZ5Z-qB3MDY-gG1f-4CPscx-bdrdAv-Mcpb8-Ds5Ck5-UPFRjE-cooZaE-7JL9Ce-6hB26p-5JFmTS-aDC2mi-4RCrCE-8qaRq-adbMyX-8pCVMh-bnJfyw-sXQZ7-fnCVbL-4RCroh-dVzSH6-fckNay-pA6MdP-6VHf97-662aRZ-aiJwYD-9Liq36-pfXnJ2-81t4TV-fnoErz-76pUCy-aDFSfu-8GBKvz-dBM5-e4tTWW-9kHH6Q-r6hZzK-95uyfv-rdHr-qBJTsu-fc3tgQ-cwgbMh-7ZQGwo-UA7SdP).
