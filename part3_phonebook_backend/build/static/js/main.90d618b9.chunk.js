(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},19:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var o=t(0),a=t.n(o),r=t(13),l=t.n(r),c=(t(19),t(2)),u=function(e){var n=e.persons,t=e.sfilter,o=e.removePerson;return a.a.createElement("div",null,n.filter((function(e){return e.name.toLowerCase().includes(t.toLowerCase())})).map((function(e){return a.a.createElement("div",{key:e.id},e.name," ",e.phone," ",a.a.createElement("button",{onClick:function(n){n.preventDefault(),o(e.id)}},"Delete"))})))},i=function(e){var n=e.addPerson,t=e.newName,o=e.newPhone,r=e.handleNameChange,l=e.handlePhoneChange;return a.a.createElement("form",{onSubmit:n},a.a.createElement("div",null,"Name: ",a.a.createElement("input",{value:t,onChange:r})),a.a.createElement("div",null,"Phone: ",a.a.createElement("input",{value:o,onChange:l})),a.a.createElement("div",null,a.a.createElement("button",{type:"submit"},"add")))},s=function(e){var n=e.sfilter,t=e.handleSfilterChange;return a.a.createElement("div",null,"Filter shown with: ",a.a.createElement("input",{value:n,onChange:t}))},d=t(3),m=t.n(d),f="/api/persons",h=function(){return m.a.get(f).then((function(e){return e.data}))},v=function(e){return m.a.post(f,e).then((function(e){return e.data}))},E=function(e,n){return m.a.put("".concat(f,"/").concat(e),n).then((function(e){return e.data}))},g=function(e){return m.a.delete("".concat(f,"/").concat(e)).then((function(e){return e.data}))},p=function(e){var n=e.message,t=e.isError;return console.log(n),console.log(t),null===n?null:t?a.a.createElement("div",{className:"error"},n):a.a.createElement("div",{className:"notification"},n)},b=function(){var e=Object(o.useState)([]),n=Object(c.a)(e,2),t=n[0],r=n[1],l=Object(o.useState)(""),d=Object(c.a)(l,2),m=d[0],f=d[1],b=Object(o.useState)(""),w=Object(c.a)(b,2),P=w[0],C=w[1],j=Object(o.useState)(""),O=Object(c.a)(j,2),S=O[0],k=O[1],N=Object(o.useState)(null),y=Object(c.a)(N,2),D=y[0],T=y[1],B=Object(o.useState)(!1),J=Object(c.a)(B,2),L=J[0],U=J[1];Object(o.useEffect)((function(){console.log("Entered useEffect event"),h().then((function(e){r(e)}))}),[]);return a.a.createElement("div",null,a.a.createElement(p,{message:D,isError:L}),a.a.createElement("h2",null,"Phonebook"),a.a.createElement(s,{sfilter:S,handleSfilterChange:function(e){console.log("Entered handleSfilterChange mehtod"),k(e.target.value)}}),a.a.createElement("h2",null,"add a new"),a.a.createElement(i,{addPerson:function(e){console.log("Entered addPerson mehtod"),e.preventDefault();var n={name:m,number:P},o=t.filter((function(e){return e.name===m}));if(o.length>0){var a=o[0].id;window.confirm("".concat(m," already is in phonebook. Update phone number?"))?E(a,n).then((function(e){r(t.map((function(n){return n.id!==a?n:e}))),f(""),C(""),U(!1),T("Person updated sucessful into server"),setTimeout((function(){T(null),U(!1)}),5e3)})):console.log("Update canceled!")}else""===m|""===P?alert("Either Name and Phone should be filled."):v(n).then((function(e){r(t.concat(e)),f(""),C(""),U(!1),T("Person added sucessful into server"),setTimeout((function(){T(null),U(!1)}),5e3)})).catch((function(e){console.log(e.response.data),U(!0),T(e.response.data),setTimeout((function(){T(null),U(!1)}),5e3)}))},newName:m,newPhone:P,handleNameChange:function(e){console.log("Entered handleNameChange mehtod"),e.preventDefault(),f(e.target.value)},handlePhoneChange:function(e){console.log("Entered handlePhoneChange mehtod"),e.preventDefault(),C(e.target.value)}}),a.a.createElement("h2",null,"Numbers"),a.a.createElement(u,{persons:t,sfilter:S,removePerson:function(e){console.log("Entered removePerson mehtod",e),window.confirm("Do you really want to remove this entry?")?(g(e).then((function(e){f(""),C(""),T("Person sucessful removed from server"),setTimeout((function(){T(null),U(!1)}),5e3)})).catch((function(e){U(!0),T("Person was already removed from server"),setTimeout((function(){T(null),U(!1)}),5e3)})),r(t.filter((function(n){return n.id!==e})))):console.log("Cancel remove person")}}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(b,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[14,1,2]]]);
//# sourceMappingURL=main.90d618b9.chunk.js.map