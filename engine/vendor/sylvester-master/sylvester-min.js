var Sylvester={precision:1e-6};Sylvester.Vector=function(){},Sylvester.Vector.create=function(e){var t=new Sylvester.Vector;return t.setElements(e)};var $V=Sylvester.Vector.create;Sylvester.Vector.Random=function(e){for(var t=[];e--;)t[e]=Math.random();return Sylvester.Vector.create(t)},Sylvester.Vector.Zero=function(e){for(var t=[];e--;)t[e]=0;return Sylvester.Vector.create(t)},Sylvester.Vector.prototype={e:function(e){return 1>e||e>this.elements.length?null:this.elements[e-1]},dimensions:function(){return this.elements.length},modulus:function(){return Math.sqrt(this.dot(this))},eql:function(e){var t=this.elements.length,n=e.elements||e;if(t!==n.length)return!1;for(;t--;)if(Math.abs(this.elements[t]-n[t])>Sylvester.precision)return!1;return!0},dup:function(){return Sylvester.Vector.create(this.elements)},map:function(e,t){var n=[];return this.each(function(r,s){n[s-1]=e.call(t,r,s)}),Sylvester.Vector.create(n)},forEach:function(e,t){for(var n=this.elements.length,r=0;n>r;r++)e.call(t,this.elements[r],r+1)},toUnitVector:function(){var e=this.modulus();return 0===e?this.dup():this.map(function(t){return t/e})},angleFrom:function(e){var t=e.elements||e,n=this.elements.length;if(n!==t.length)return null;var r=0,s=0,i=0;if(this.each(function(e,n){r+=e*t[n-1],s+=e*e,i+=t[n-1]*t[n-1]}),s=Math.sqrt(s),i=Math.sqrt(i),s*i===0)return null;var l=r/(s*i);return-1>l&&(l=-1),l>1&&(l=1),Math.acos(l)},isParallelTo:function(e){var t=this.angleFrom(e);return null===t?null:t<=Sylvester.precision},isAntiparallelTo:function(e){var t=this.angleFrom(e);return null===t?null:Math.abs(t-Math.PI)<=Sylvester.precision},isPerpendicularTo:function(e){var t=this.dot(e);return null===t?null:Math.abs(t)<=Sylvester.precision},add:function(e){var t=e.elements||e;return this.elements.length!==t.length?null:this.map(function(e,n){return e+t[n-1]})},subtract:function(e){var t=e.elements||e,n=this.elements.length;if(n!==t.length)return null;for(var r=this.elements,s=[];n--;)s[n]=r[n]-t[n];return Sylvester.Vector.create(s)},multiply:function(e){for(var t=this.elements,n=t.length,r=[];n--;)r[n]=t[n]*e;return Sylvester.Vector.create(r)},pairwiseMultiply:function(e){if(!e.elements||this.elements.length!==e.elements.length)return null;var t=[],n=this.elements,r=n.length,s=e.elements;for(i=0;i<r;i++)t[i]=n[i]*s[i];return Sylvester.Vector.create(t)},pairwiseDivide:function(e){if(!e.elements||this.elements.length!==e.elements.length)return null;var t=[],n=this.elements,r=n.length,s=e.elements;for(i=0;i<r;i++)t[i]=n[i]/s[i];return Sylvester.Vector.create(t)},dot:function(e){var t=e.elements||e,n=0,r=this.elements.length;if(r!==t.length)return null;for(;r--;)n+=this.elements[r]*t[r];return n},cross:function(e){var t=e.elements||e;if(3!==this.elements.length||3!==t.length)return null;var n=this.elements;return Sylvester.Vector.create([n[1]*t[2]-n[2]*t[1],n[2]*t[0]-n[0]*t[2],n[0]*t[1]-n[1]*t[0]])},sum:function(){for(var e=0,t=this.elements,n=t.length,r=0;n>r;r++)e+=t[r];return e},max:function(){for(var e=0,t=this.elements,n=t.length;n--;)Math.abs(t[n])>Math.abs(e)&&(e=t[n]);return e},indexOf:function(e){for(var t=null,n=this.elements,r=n.length,s=0;r>s;s++)null===t&&n[s]===e&&(t=s+1);return t},toDiagonalMatrix:function(){return Sylvester.Matrix.Diagonal(this.elements)},round:function(){for(var e=this.elements,t=e.length,n=[];t--;)n[t]=Math.round(e[t]);return Sylvester.Vector.create(n)},snapTo:function(e){for(var t=this.elements,n=t.length,r=[];n--;)r[n]=Math.abs(t[n]-e)<=Sylvester.precision?e:t[n];return Sylvester.Vector.create(r)},distanceFrom:function(e){if(e.anchor||e.start&&e.end)return e.distanceFrom(this);var t=e.elements||e;if(t.length!==this.elements.length)return null;var n,r=0;return this.each(function(e,s){n=e-t[s-1],r+=n*n}),Math.sqrt(r)},liesOn:function(e){return e.contains(this)},liesIn:function(e){return e.contains(this)},rotate:function(e,t){var n,r,s,i,l=null;switch(e.determinant&&(l=e.elements),this.elements.length){case 2:return n=t.elements||t,2!==n.length?null:(l||(l=Sylvester.Matrix.Rotation(e).elements),r=this.elements[0]-n[0],s=this.elements[1]-n[1],Sylvester.Vector.create([n[0]+l[0][0]*r+l[0][1]*s,n[1]+l[1][0]*r+l[1][1]*s]));case 3:if(!t.direction)return null;var a=t.pointClosestTo(this).elements;return l||(l=Sylvester.Matrix.Rotation(e,t.direction).elements),r=this.elements[0]-a[0],s=this.elements[1]-a[1],i=this.elements[2]-a[2],Sylvester.Vector.create([a[0]+l[0][0]*r+l[0][1]*s+l[0][2]*i,a[1]+l[1][0]*r+l[1][1]*s+l[1][2]*i,a[2]+l[2][0]*r+l[2][1]*s+l[2][2]*i]);default:return null}},reflectionIn:function(e){if(e.anchor){var t=this.elements.slice(),n=e.pointClosestTo(t).elements;return Sylvester.Vector.create([n[0]+(n[0]-t[0]),n[1]+(n[1]-t[1]),n[2]+(n[2]-(t[2]||0))])}var r=e.elements||e;return this.elements.length!==r.length?null:this.map(function(e,t){return r[t-1]+(r[t-1]-e)})},to3D:function(){var e=this.dup();switch(e.elements.length){case 3:break;case 2:e.elements.push(0);break;default:return null}return e},inspect:function(){return"["+this.elements.join(", ")+"]"},setElements:function(e){return this.elements=(e.elements||e).slice(),this}},Sylvester.Vector.prototype.x=Sylvester.Vector.prototype.multiply,Sylvester.Vector.prototype.each=Sylvester.Vector.prototype.forEach,Sylvester.Vector.i=Sylvester.Vector.create([1,0,0]),Sylvester.Vector.j=Sylvester.Vector.create([0,1,0]),Sylvester.Vector.k=Sylvester.Vector.create([0,0,1]),Sylvester.Matrix=function(){},Sylvester.Matrix.create=function(e){var t=new Sylvester.Matrix;return t.setElements(e)};var $M=Sylvester.Matrix.create;Sylvester.Matrix.I=function(e){for(var t,n=[],r=e;r--;)for(t=e,n[r]=[];t--;)n[r][t]=r===t?1:0;return Sylvester.Matrix.create(n)},Sylvester.Matrix.Diagonal=function(e){for(var t=e.length,n=Sylvester.Matrix.I(t);t--;)n.elements[t][t]=e[t];return n},Sylvester.Matrix.Rotation=function(e,t){if(!t)return Sylvester.Matrix.create([[Math.cos(e),-Math.sin(e)],[Math.sin(e),Math.cos(e)]]);var n=t.dup();if(3!==n.elements.length)return null;var r=n.modulus(),s=n.elements[0]/r,i=n.elements[1]/r,l=n.elements[2]/r,a=Math.sin(e),o=Math.cos(e),h=1-o;return Sylvester.Matrix.create([[h*s*s+o,h*s*i-a*l,h*s*l+a*i],[h*s*i+a*l,h*i*i+o,h*i*l-a*s],[h*s*l-a*i,h*i*l+a*s,h*l*l+o]])},Sylvester.Matrix.RotationX=function(e){var t=Math.cos(e),n=Math.sin(e);return Sylvester.Matrix.create([[1,0,0],[0,t,-n],[0,n,t]])},Sylvester.Matrix.RotationY=function(e){var t=Math.cos(e),n=Math.sin(e);return Sylvester.Matrix.create([[t,0,n],[0,1,0],[-n,0,t]])},Sylvester.Matrix.RotationZ=function(e){var t=Math.cos(e),n=Math.sin(e);return Sylvester.Matrix.create([[t,-n,0],[n,t,0],[0,0,1]])},Sylvester.Matrix.Random=function(e,t){return Sylvester.Matrix.Zero(e,t).map(function(){return Math.random()})},Sylvester.Matrix.Zero=function(e,t){for(var n,r=[],s=e;s--;)for(n=t,r[s]=[];n--;)r[s][n]=0;return Sylvester.Matrix.create(r)},Sylvester.Matrix.prototype={e:function(e,t){return 1>e||e>this.elements.length||1>t||t>this.elements[0].length?null:this.elements[e-1][t-1]},row:function(e){return e>this.elements.length?null:Sylvester.Vector.create(this.elements[e-1])},col:function(e){if(0===this.elements.length)return null;if(e>this.elements[0].length)return null;for(var t=[],n=this.elements.length,r=0;n>r;r++)t.push(this.elements[r][e-1]);return Sylvester.Vector.create(t)},dimensions:function(){var e=0===this.elements.length?0:this.elements[0].length;return{rows:this.elements.length,cols:e}},rows:function(){return this.elements.length},cols:function(){return 0===this.elements.length?0:this.elements[0].length},eql:function(e){var t=e.elements||e;if(t[0]&&void 0!==t[0][0]||(t=Sylvester.Matrix.create(t).elements),0===this.elements.length||0===t.length)return this.elements.length===t.length;if(this.elements.length!==t.length)return!1;if(this.elements[0].length!==t[0].length)return!1;for(var n,r=this.elements.length,s=this.elements[0].length;r--;)for(n=s;n--;)if(Math.abs(this.elements[r][n]-t[r][n])>Sylvester.precision)return!1;return!0},dup:function(){return Sylvester.Matrix.create(this.elements)},map:function(e,t){if(0===this.elements.length)return Sylvester.Matrix.create([]);for(var n,r=[],s=this.elements.length,i=this.elements[0].length;s--;)for(n=i,r[s]=[];n--;)r[s][n]=e.call(t,this.elements[s][n],s+1,n+1);return Sylvester.Matrix.create(r)},isSameSizeAs:function(e){var t=e.elements||e;return void 0===t[0][0]&&(t=Sylvester.Matrix.create(t).elements),0===this.elements.length?0===t.length:this.elements.length===t.length&&this.elements[0].length===t[0].length},add:function(e){if(0===this.elements.length)return this.map(function(e){return e});var t=e.elements||e;return void 0===t[0][0]&&(t=Sylvester.Matrix.create(t).elements),this.isSameSizeAs(t)?this.map(function(e,n,r){return e+t[n-1][r-1]}):null},subtract:function(e){if(0===this.elements.length)return this.map(function(e){return e});var t=e.elements||e;return void 0===t[0][0]&&(t=Sylvester.Matrix.create(t).elements),this.isSameSizeAs(t)?this.map(function(e,n,r){return e-t[n-1][r-1]}):null},canMultiplyFromLeft:function(e){if(0===this.elements.length)return!1;var t=e.elements||e;return void 0===t[0][0]&&(t=Sylvester.Matrix.create(t).elements),this.elements[0].length===t.length},multiply:function(e){if(0===this.elements.length)return null;if(!e.elements)return this.map(function(t){return t*e});var t=e.modulus?!0:!1,n=e.elements||e;if(void 0===n[0][0]&&(n=Sylvester.Matrix.create(n).elements),!this.canMultiplyFromLeft(n))return null;for(var r,s,i,l=this.elements.length,a=n[0].length,o=this.elements[0].length,h=[];l--;)for(r=a,h[l]=[];r--;){for(s=o,i=0;s--;)i+=this.elements[l][s]*n[s][r];h[l][r]=i}var n=Sylvester.Matrix.create(h);return t?n.col(1):n},pairwiseMultiply:function(e){if(!this.isSameSizeAs(e))return null;for(var t,n=[],r=this.elements.length,s=this.elements[0].length;r--;)for(t=s,n[r]=[];t--;)n[r][t]=this.elements[r][t]*e.elements[r][t];return Sylvester.Matrix.create(n)},minor:function(e,t,n,r){if(0===this.elements.length)return null;for(var s,i,l,a=[],o=n,h=this.elements.length,c=this.elements[0].length;o--;)for(s=n-o-1,a[s]=[],i=r;i--;)l=r-i-1,a[s][l]=this.elements[(e+s-1)%h][(t+l-1)%c];return Sylvester.Matrix.create(a)},transpose:function(){if(0===this.elements.length)return Sylvester.Matrix.create([]);for(var e,t,n=this.elements.length,r=this.elements[0].length,s=[],e=r;e--;)for(t=n,s[e]=[];t--;)s[e][t]=this.elements[t][e];return Sylvester.Matrix.create(s)},isSquare:function(){var e=0===this.elements.length?0:this.elements[0].length;return this.elements.length===e},max:function(){if(0===this.elements.length)return null;for(var e,t=0,n=this.elements.length,r=this.elements[0].length;n--;)for(e=r;e--;)Math.abs(this.elements[n][e])>Math.abs(t)&&(t=this.elements[n][e]);return t},indexOf:function(e){if(0===this.elements.length)return null;var t,n,r=this.elements.length,s=this.elements[0].length;for(t=0;r>t;t++)for(n=0;s>n;n++)if(this.elements[t][n]===e)return{i:t+1,j:n+1};return null},diagonal:function(){if(!this.isSquare)return null;for(var e=[],t=this.elements.length,n=0;t>n;n++)e[n]=this.elements[n][n];return Sylvester.Vector.create(e)},toRightTriangular:function(){if(0===this.elements.length)return Sylvester.Matrix.create([]);var e,t,n,r,s=this.dup(),i=this.elements.length,l=this.elements[0].length;for(t=0;i>t;t++){if(0===s.elements[t][t])for(n=t+1;i>n;n++)if(0!==s.elements[n][t]){for(e=[],r=0;l>r;r++)e.push(s.elements[t][r]+s.elements[n][r]);s.elements[t]=e;break}if(0!==s.elements[t][t])for(n=t+1;i>n;n++){var a=s.elements[n][t]/s.elements[t][t];for(e=[],r=0;l>r;r++)e.push(t>=r?0:s.elements[n][r]-s.elements[t][r]*a);s.elements[n]=e}}return s},determinant:function(){if(0===this.elements.length)return 1;if(!this.isSquare())return null;for(var e=this.toRightTriangular(),t=e.elements[0][0],n=e.elements.length,r=1;n>r;r++)t*=e.elements[r][r];return t},isSingular:function(){return this.isSquare()&&0===this.determinant()},trace:function(){if(0===this.elements.length)return 0;if(!this.isSquare())return null;for(var e=this.elements[0][0],t=this.elements.length,n=1;t>n;n++)e+=this.elements[n][n];return e},rank:function(){if(0===this.elements.length)return 0;for(var e,t=this.toRightTriangular(),n=0,r=this.elements.length,s=this.elements[0].length;r--;)for(e=s;e--;)if(Math.abs(t.elements[r][e])>Sylvester.precision){n++;break}return n},augment:function(e){if(0===this.elements.length)return this.dup();var t=e.elements||e;void 0===t[0][0]&&(t=Sylvester.Matrix.create(t).elements);var n,r=this.dup(),s=r.elements[0].length,i=r.elements.length,l=t[0].length;if(i!==t.length)return null;for(;i--;)for(n=l;n--;)r.elements[i][s+n]=t[i][n];return r},inverse:function(){if(0===this.elements.length)return null;if(!this.isSquare()||this.isSingular())return null;for(var e,t,n,r,s,i=this.elements.length,l=i,a=this.augment(Sylvester.Matrix.I(i)).toRightTriangular(),o=a.elements[0].length,h=[];l--;){for(n=[],h[l]=[],r=a.elements[l][l],t=0;o>t;t++)s=a.elements[l][t]/r,n.push(s),t>=i&&h[l].push(s);for(a.elements[l]=n,e=l;e--;){for(n=[],t=0;o>t;t++)n.push(a.elements[e][t]-a.elements[l][t]*a.elements[e][l]);a.elements[e]=n}}return Sylvester.Matrix.create(h)},round:function(){return this.map(function(e){return Math.round(e)})},snapTo:function(e){return this.map(function(t){return Math.abs(t-e)<=Sylvester.precision?e:t})},sum:function(){for(var e,t,n,r=0,s=this.elements,i=s.length,l=0;i>l;l++)for(t=s[l],n=t.length,e=0;n>e;e++)r+=t[l];return r},inspect:function(){var e=[],t=this.elements.length;if(0===t)return"[]";for(var n=0;t>n;n++)e.push(Sylvester.Vector.create(this.elements[n]).inspect());return e.join("\n")},setElements:function(e){var t,n,r=e.elements||e;if(r[0]&&void 0!==r[0][0]){for(t=r.length,this.elements=[];t--;)for(n=r[t].length,this.elements[t]=[];n--;)this.elements[t][n]=r[t][n];return this}var s=r.length;for(this.elements=[],t=0;s>t;t++)this.elements.push([r[t]]);return this},eigenvalues:function(){if(2===!this.elements.length)return null;if(!this.isSquare())return null;var e=this.elements,t=e[0][0],n=e[0][1],r=e[1][0],s=e[1][1],i=.5*(t+s+Math.sqrt((t-s)*(t-s)+4*n*r)),l=.5*(t+s-Math.sqrt((t-s)*(t-s)+4*n*r)),a=[i,l].sort();return Sylvester.Vector.create(a)},eigenvectors:function(){function e(e,t){var n,r,i,l=e[0][0],a=e[0][1],o=e[1][0],h=e[1][1];return Math.abs(l-t)<s&&Math.abs(a)<s?0>o?(n=-t+h,r=-o):(n=t-h,r=o):0>t-l?(n=-a,r=-t+l):(n=a,r=t-l),i=Math.sqrt(n*n+r*r),[n/i,r/i]}if(2===!this.elements.length)return null;if(!this.isSquare())return null;var t,n=this.elements,r=this.eigenvalues().elements,s=Sylvester.precision;if(Math.abs(r[0]-r[1])<s)t=Math.abs(n[0][0]-r[0])<s&&Math.abs(n[0][1])<s&&Math.abs(n[1][0])<s&&Math.abs(n[1][1]-r[0])<s?[1,0,0,1]:[e(n,r[0])[0],e(n,r[0])[1],NaN,NaN];else{var i=e(n,r[0]),l=e(n,r[1]);t=i[0]*l[1]-i[1]*l[0]>0?[i[0],i[1],l[0],l[1]]:[i[0],i[1],-l[0],-l[1]]}return 4===t.length?Sylvester.Matrix.create([[t[0],t[1]],[t[2],t[3]]]):Sylvester.Vector.create([t[0],t[1]])}},Sylvester.Matrix.prototype.toUpperTriangular=Sylvester.Matrix.prototype.toRightTriangular,Sylvester.Matrix.prototype.det=Sylvester.Matrix.prototype.determinant,Sylvester.Matrix.prototype.tr=Sylvester.Matrix.prototype.trace,Sylvester.Matrix.prototype.rk=Sylvester.Matrix.prototype.rank,Sylvester.Matrix.prototype.inv=Sylvester.Matrix.prototype.inverse,Sylvester.Matrix.prototype.x=Sylvester.Matrix.prototype.multiply,Sylvester.Line=function(){},Sylvester.Line.prototype={eql:function(e){return this.isParallelTo(e)&&this.contains(e.anchor)},dup:function(){return Sylvester.Line.create(this.anchor,this.direction)},translate:function(e){var t=e.elements||e;return Sylvester.Line.create([this.anchor.elements[0]+t[0],this.anchor.elements[1]+t[1],this.anchor.elements[2]+(t[2]||0)],this.direction)},isParallelTo:function(e){if(e.normal||e.start&&e.end)return e.isParallelTo(this);var t=this.direction.angleFrom(e.direction);return Math.abs(t)<=Sylvester.precision||Math.abs(t-Math.PI)<=Sylvester.precision},distanceFrom:function(e){if(e.normal||e.start&&e.end)return e.distanceFrom(this);if(e.direction){if(this.isParallelTo(e))return this.distanceFrom(e.anchor);var t=this.direction.cross(e.direction).toUnitVector().elements,n=this.anchor.elements,r=e.anchor.elements;return Math.abs((n[0]-r[0])*t[0]+(n[1]-r[1])*t[1]+(n[2]-r[2])*t[2])}var s=e.elements||e,n=this.anchor.elements,i=this.direction.elements,l=s[0]-n[0],a=s[1]-n[1],o=(s[2]||0)-n[2],h=Math.sqrt(l*l+a*a+o*o);if(0===h)return 0;var c=(l*i[0]+a*i[1]+o*i[2])/h,u=1-c*c;return Math.abs(h*Math.sqrt(0>u?0:u))},contains:function(e){if(e.start&&e.end)return this.contains(e.start)&&this.contains(e.end);var t=this.distanceFrom(e);return null!==t&&t<=Sylvester.precision},positionOf:function(e){if(!this.contains(e))return null;var t=e.elements||e,n=this.anchor.elements,r=this.direction.elements;return(t[0]-n[0])*r[0]+(t[1]-n[1])*r[1]+((t[2]||0)-n[2])*r[2]},liesIn:function(e){return e.contains(this)},intersects:function(e){return e.normal?e.intersects(this):!this.isParallelTo(e)&&this.distanceFrom(e)<=Sylvester.precision},intersectionWith:function(e){if(e.normal||e.start&&e.end)return e.intersectionWith(this);if(!this.intersects(e))return null;var t=this.anchor.elements,n=this.direction.elements,r=e.anchor.elements,s=e.direction.elements,i=n[0],l=n[1],a=n[2],o=s[0],h=s[1],c=s[2],u=t[0]-r[0],v=t[1]-r[1],m=t[2]-r[2],f=-i*u-l*v-a*m,y=o*u+h*v+c*m,S=i*i+l*l+a*a,d=o*o+h*h+c*c,p=i*o+l*h+a*c,g=(f*d/S+p*y)/(d-p*p);return Sylvester.Vector.create([t[0]+g*i,t[1]+g*l,t[2]+g*a])},pointClosestTo:function(e){if(e.start&&e.end){var t=e.pointClosestTo(this);return null===t?null:this.pointClosestTo(t)}if(e.direction){if(this.intersects(e))return this.intersectionWith(e);if(this.isParallelTo(e))return null;var n=this.direction.elements,r=e.direction.elements,s=n[0],i=n[1],l=n[2],a=r[0],o=r[1],h=r[2],c=l*a-s*h,u=s*o-i*a,v=i*h-l*o,m=[c*h-u*o,u*a-v*h,v*o-c*a],t=Sylvester.Plane.create(e.anchor,m);return t.intersectionWith(this)}var t=e.elements||e;if(this.contains(t))return Sylvester.Vector.create(t);var f=this.anchor.elements,n=this.direction.elements,s=n[0],i=n[1],l=n[2],y=f[0],S=f[1],d=f[2],c=s*(t[1]-S)-i*(t[0]-y),u=i*((t[2]||0)-d)-l*(t[1]-S),v=l*(t[0]-y)-s*((t[2]||0)-d),p=Sylvester.Vector.create([i*c-l*v,l*u-s*c,s*v-i*u]),g=this.distanceFrom(t)/p.modulus();return Sylvester.Vector.create([t[0]+p.elements[0]*g,t[1]+p.elements[1]*g,(t[2]||0)+p.elements[2]*g])},rotate:function(e,t){void 0===t.direction&&(t=Sylvester.Line.create(t.to3D(),Sylvester.Vector.k));var n=Sylvester.Matrix.Rotation(e,t.direction).elements,r=t.pointClosestTo(this.anchor).elements,s=this.anchor.elements,i=this.direction.elements,l=r[0],a=r[1],o=r[2],h=s[0],c=s[1],u=s[2],v=h-l,m=c-a,f=u-o;return Sylvester.Line.create([l+n[0][0]*v+n[0][1]*m+n[0][2]*f,a+n[1][0]*v+n[1][1]*m+n[1][2]*f,o+n[2][0]*v+n[2][1]*m+n[2][2]*f],[n[0][0]*i[0]+n[0][1]*i[1]+n[0][2]*i[2],n[1][0]*i[0]+n[1][1]*i[1]+n[1][2]*i[2],n[2][0]*i[0]+n[2][1]*i[1]+n[2][2]*i[2]])},reverse:function(){return Sylvester.Line.create(this.anchor,this.direction.x(-1))},reflectionIn:function(e){if(e.normal){var t=this.anchor.elements,n=this.direction.elements,r=t[0],s=t[1],i=t[2],l=n[0],a=n[1],o=n[2],h=this.anchor.reflectionIn(e).elements,c=r+l,u=s+a,v=i+o,m=e.pointClosestTo([c,u,v]).elements,f=[m[0]+(m[0]-c)-h[0],m[1]+(m[1]-u)-h[1],m[2]+(m[2]-v)-h[2]];return Sylvester.Line.create(h,f)}if(e.direction)return this.rotate(Math.PI,e);var y=e.elements||e;return Sylvester.Line.create(this.anchor.reflectionIn([y[0],y[1],y[2]||0]),this.direction)},setVectors:function(e,t){if(e=Sylvester.Vector.create(e),t=Sylvester.Vector.create(t),2===e.elements.length&&e.elements.push(0),2===t.elements.length&&t.elements.push(0),e.elements.length>3||t.elements.length>3)return null;var n=t.modulus();return 0===n?null:(this.anchor=e,this.direction=Sylvester.Vector.create([t.elements[0]/n,t.elements[1]/n,t.elements[2]/n]),this)}},Sylvester.Line.create=function(e,t){var n=new Sylvester.Line;return n.setVectors(e,t)};var $L=Sylvester.Line.create;Sylvester.Line.X=Sylvester.Line.create(Sylvester.Vector.Zero(3),Sylvester.Vector.i),Sylvester.Line.Y=Sylvester.Line.create(Sylvester.Vector.Zero(3),Sylvester.Vector.j),Sylvester.Line.Z=Sylvester.Line.create(Sylvester.Vector.Zero(3),Sylvester.Vector.k),Sylvester.Line.Segment=function(){},Sylvester.Line.Segment.prototype={eql:function(e){return this.start.eql(e.start)&&this.end.eql(e.end)||this.start.eql(e.end)&&this.end.eql(e.start)},dup:function(){return Sylvester.Line.Segment.create(this.start,this.end)},length:function(){var e=this.start.elements,t=this.end.elements,n=t[0]-e[0],r=t[1]-e[1],s=t[2]-e[2];return Math.sqrt(n*n+r*r+s*s)},toVector:function(){var e=this.start.elements,t=this.end.elements;return Sylvester.Vector.create([t[0]-e[0],t[1]-e[1],t[2]-e[2]])},midpoint:function(){var e=this.start.elements,t=this.end.elements;return Sylvester.Vector.create([(t[0]+e[0])/2,(t[1]+e[1])/2,(t[2]+e[2])/2])},bisectingPlane:function(){return Sylvester.Plane.create(this.midpoint(),this.toVector())},translate:function(e){var t=e.elements||e,n=this.start.elements,r=this.end.elements;return Sylvester.Line.Segment.create([n[0]+t[0],n[1]+t[1],n[2]+(t[2]||0)],[r[0]+t[0],r[1]+t[1],r[2]+(t[2]||0)])},isParallelTo:function(e){return this.line.isParallelTo(e)},distanceFrom:function(e){var t=this.pointClosestTo(e);return null===t?null:t.distanceFrom(e)},contains:function(e){if(e.start&&e.end)return this.contains(e.start)&&this.contains(e.end);var t=(e.elements||e).slice();if(2===t.length&&t.push(0),this.start.eql(t))return!0;var n=this.start.elements,r=Sylvester.Vector.create([n[0]-t[0],n[1]-t[1],n[2]-(t[2]||0)]),s=this.toVector();return r.isAntiparallelTo(s)&&r.modulus()<=s.modulus()},intersects:function(e){return null!==this.intersectionWith(e)},intersectionWith:function(e){if(!this.line.intersects(e))return null;var t=this.line.intersectionWith(e);return this.contains(t)?t:null},pointClosestTo:function(e){if(e.normal){var t=this.line.intersectionWith(e);return null===t?null:this.pointClosestTo(t)}var n=this.line.pointClosestTo(e);return null===n?null:this.contains(n)?n:(this.line.positionOf(n)<0?this.start:this.end).dup()},setPoints:function(e,t){return e=Sylvester.Vector.create(e).to3D(),t=Sylvester.Vector.create(t).to3D(),null===e||null===t?null:(this.line=Sylvester.Line.create(e,t.subtract(e)),this.start=e,this.end=t,this)}},Sylvester.Line.Segment.create=function(e,t){var n=new Sylvester.Line.Segment;return n.setPoints(e,t)},Sylvester.Plane=function(){},Sylvester.Plane.prototype={eql:function(e){return this.contains(e.anchor)&&this.isParallelTo(e)},dup:function(){return Sylvester.Plane.create(this.anchor,this.normal)},translate:function(e){var t=e.elements||e;return Sylvester.Plane.create([this.anchor.elements[0]+t[0],this.anchor.elements[1]+t[1],this.anchor.elements[2]+(t[2]||0)],this.normal)},isParallelTo:function(e){var t;return e.normal?(t=this.normal.angleFrom(e.normal),Math.abs(t)<=Sylvester.precision||Math.abs(Math.PI-t)<=Sylvester.precision):e.direction?this.normal.isPerpendicularTo(e.direction):null},isPerpendicularTo:function(e){var t=this.normal.angleFrom(e.normal);return Math.abs(Math.PI/2-t)<=Sylvester.precision},distanceFrom:function(e){if(this.intersects(e)||this.contains(e))return 0;if(e.anchor){var t=this.anchor.elements,n=e.anchor.elements,r=this.normal.elements;return Math.abs((t[0]-n[0])*r[0]+(t[1]-n[1])*r[1]+(t[2]-n[2])*r[2])}var s=e.elements||e,t=this.anchor.elements,r=this.normal.elements;return Math.abs((t[0]-s[0])*r[0]+(t[1]-s[1])*r[1]+(t[2]-(s[2]||0))*r[2])},contains:function(e){if(e.normal)return null;if(e.direction)return this.contains(e.anchor)&&this.contains(e.anchor.add(e.direction));var t=e.elements||e,n=this.anchor.elements,r=this.normal.elements,s=Math.abs(r[0]*(n[0]-t[0])+r[1]*(n[1]-t[1])+r[2]*(n[2]-(t[2]||0)));return s<=Sylvester.precision},intersects:function(e){return void 0===e.direction&&void 0===e.normal?null:!this.isParallelTo(e)},intersectionWith:function(e){if(!this.intersects(e))return null;if(e.direction){var t=e.anchor.elements,n=e.direction.elements,r=this.anchor.elements,s=this.normal.elements,i=(s[0]*(r[0]-t[0])+s[1]*(r[1]-t[1])+s[2]*(r[2]-t[2]))/(s[0]*n[0]+s[1]*n[1]+s[2]*n[2]);return Sylvester.Vector.create([t[0]+n[0]*i,t[1]+n[1]*i,t[2]+n[2]*i])}if(e.normal){for(var l=this.normal.cross(e.normal).toUnitVector(),s=this.normal.elements,t=this.anchor.elements,a=e.normal.elements,o=e.anchor.elements,h=Sylvester.Matrix.Zero(2,2),c=0;h.isSingular();)c++,h=Sylvester.Matrix.create([[s[c%3],s[(c+1)%3]],[a[c%3],a[(c+1)%3]]]);for(var u=h.inverse().elements,v=s[0]*t[0]+s[1]*t[1]+s[2]*t[2],m=a[0]*o[0]+a[1]*o[1]+a[2]*o[2],f=[u[0][0]*v+u[0][1]*m,u[1][0]*v+u[1][1]*m],y=[],S=1;3>=S;S++)y.push(c===S?0:f[(S+(5-c)%3)%3]);return Sylvester.Line.create(y,l)}},pointClosestTo:function(e){var t=e.elements||e,n=this.anchor.elements,r=this.normal.elements,s=(n[0]-t[0])*r[0]+(n[1]-t[1])*r[1]+(n[2]-(t[2]||0))*r[2];return Sylvester.Vector.create([t[0]+r[0]*s,t[1]+r[1]*s,(t[2]||0)+r[2]*s])},rotate:function(e,t){var n=e.determinant?e.elements:Sylvester.Matrix.Rotation(e,t.direction).elements,r=t.pointClosestTo(this.anchor).elements,s=this.anchor.elements,i=this.normal.elements,l=r[0],a=r[1],o=r[2],h=s[0],c=s[1],u=s[2],v=h-l,m=c-a,f=u-o;return Sylvester.Plane.create([l+n[0][0]*v+n[0][1]*m+n[0][2]*f,a+n[1][0]*v+n[1][1]*m+n[1][2]*f,o+n[2][0]*v+n[2][1]*m+n[2][2]*f],[n[0][0]*i[0]+n[0][1]*i[1]+n[0][2]*i[2],n[1][0]*i[0]+n[1][1]*i[1]+n[1][2]*i[2],n[2][0]*i[0]+n[2][1]*i[1]+n[2][2]*i[2]])},reflectionIn:function(e){if(e.normal){var t=this.anchor.elements,n=this.normal.elements,r=t[0],s=t[1],i=t[2],l=n[0],a=n[1],o=n[2],h=this.anchor.reflectionIn(e).elements,c=r+l,u=s+a,v=i+o,m=e.pointClosestTo([c,u,v]).elements,f=[m[0]+(m[0]-c)-h[0],m[1]+(m[1]-u)-h[1],m[2]+(m[2]-v)-h[2]];return Sylvester.Plane.create(h,f)}if(e.direction)return this.rotate(Math.PI,e);var y=e.elements||e;return Sylvester.Plane.create(this.anchor.reflectionIn([y[0],y[1],y[2]||0]),this.normal)},setVectors:function(e,t,n){if(e=Sylvester.Vector.create(e),e=e.to3D(),null===e)return null;if(t=Sylvester.Vector.create(t),t=t.to3D(),null===t)return null;if(void 0===n)n=null;else if(n=Sylvester.Vector.create(n),n=n.to3D(),null===n)return null;var r,s,i=e.elements[0],l=e.elements[1],a=e.elements[2],o=t.elements[0],h=t.elements[1],c=t.elements[2];if(null!==n){var u=n.elements[0],v=n.elements[1],m=n.elements[2];if(r=Sylvester.Vector.create([(h-l)*(m-a)-(c-a)*(v-l),(c-a)*(u-i)-(o-i)*(m-a),(o-i)*(v-l)-(h-l)*(u-i)]),s=r.modulus(),0===s)return null;r=Sylvester.Vector.create([r.elements[0]/s,r.elements[1]/s,r.elements[2]/s])}else{if(s=Math.sqrt(o*o+h*h+c*c),0===s)return null;r=Sylvester.Vector.create([t.elements[0]/s,t.elements[1]/s,t.elements[2]/s])}return this.anchor=e,this.normal=r,this}},Sylvester.Plane.create=function(e,t,n){var r=new Sylvester.Plane;return r.setVectors(e,t,n)};var $P=Sylvester.Plane.create;Sylvester.Plane.XY=Sylvester.Plane.create(Sylvester.Vector.Zero(3),Sylvester.Vector.k),Sylvester.Plane.YZ=Sylvester.Plane.create(Sylvester.Vector.Zero(3),Sylvester.Vector.i),Sylvester.Plane.ZX=Sylvester.Plane.create(Sylvester.Vector.Zero(3),Sylvester.Vector.j),Sylvester.Plane.YX=Sylvester.Plane.XY,Sylvester.Plane.ZY=Sylvester.Plane.YZ,Sylvester.Plane.XZ=Sylvester.Plane.ZX,Sylvester.Plane.fromPoints=function(e){var t,n,r,s,i,l,a,o,h,c,u=e.length,v=[],m=Sylvester.Vector.Zero(3);for(t=0;u>t;t++){if(n=Sylvester.Vector.create(e[t]).to3D(),null===n)return null;if(v.push(n),r=v.length,r>2){if(i=v[r-1].elements,l=v[r-2].elements,a=v[r-3].elements,s=Sylvester.Vector.create([(i[1]-l[1])*(a[2]-l[2])-(i[2]-l[2])*(a[1]-l[1]),(i[2]-l[2])*(a[0]-l[0])-(i[0]-l[0])*(a[2]-l[2]),(i[0]-l[0])*(a[1]-l[1])-(i[1]-l[1])*(a[0]-l[0])]).toUnitVector(),r>3&&(h=s.angleFrom(c),null!==h&&!(Math.abs(h)<=Sylvester.precision||Math.abs(h-Math.PI)<=Sylvester.precision)))return null;m=m.add(s),c=s}}return i=v[1].elements,l=v[0].elements,a=v[r-1].elements,o=v[r-2].elements,m=m.add(Sylvester.Vector.create([(i[1]-l[1])*(a[2]-l[2])-(i[2]-l[2])*(a[1]-l[1]),(i[2]-l[2])*(a[0]-l[0])-(i[0]-l[0])*(a[2]-l[2]),(i[0]-l[0])*(a[1]-l[1])-(i[1]-l[1])*(a[0]-l[0])]).toUnitVector()).add(Sylvester.Vector.create([(l[1]-a[1])*(o[2]-a[2])-(l[2]-a[2])*(o[1]-a[1]),(l[2]-a[2])*(o[0]-a[0])-(l[0]-a[0])*(o[2]-a[2]),(l[0]-a[0])*(o[1]-a[1])-(l[1]-a[1])*(o[0]-a[0])]).toUnitVector()),Sylvester.Plane.create(v[0],m)},Sylvester.Polygon=function(){},Sylvester.Polygon.prototype={v:function(e){return this.vertices.at(e-1).data},nodeFor:function(e){return this.vertices.withData(e)},dup:function(){return Sylvester.Polygon.create(this.vertices,this.plane)},translate:function(e){var t=e.elements||e;return this.vertices.each(function(e){var n=e.data.elements;e.data.setElements([n[0]+t[0],n[1]+t[1],n[2]+(t[2]||0)])}),this.plane=this.plane.translate(e),this.updateTrianglePlanes(function(t){return t.translate(e)}),this},rotate:function(e,t){var n=Sylvester.Matrix.Rotation(e,t.direction);return this.vertices.each(function(e){e.data.setElements(e.data.rotate(n,t).elements)}),this.plane=this.plane.rotate(n,t),this.updateTrianglePlanes(function(e){return e.rotate(n,t)}),this},scale:function(e,t){var n=t.elements||t;this.vertices.each(function(t){var r=t.data.elements;t.data.setElements([n[0]+e*(r[0]-n[0]),n[1]+e*(r[1]-n[1]),(n[2]||0)+e*(r[2]-(n[2]||0))])});var r=this.vertices.first.data;return this.plane.anchor.setElements(r),this.updateTrianglePlanes(function(e){return Sylvester.Plane.create(r,e.normal)}),this},updateTrianglePlanes:function(e){var t;if(null!==this.cached.triangles)for(t=this.cached.triangles.length;t--;)this.cached.triangles[t].plane=e(this.cached.triangles[t].plane);if(null!==this.cached.surfaceIntegralElements)for(t=this.cached.surfaceIntegralElements.length;t--;)this.cached.surfaceIntegralElements[t].plane=e(this.cached.surfaceIntegralElements[t].plane)},isTriangle:function(){return 3===this.vertices.length},trianglesForSurfaceIntegral:function(){if(null!==this.cached.surfaceIntegralElements)return this.cached.surfaceIntegralElements;var e=[],t=this.vertices.first.data,n=this.plane;return this.vertices.each(function(r,s){if(!(2>s)){var i=[t,r.prev.data,r.data];e.push(Sylvester.Polygon.create(i,Sylvester.Plane.fromPoints(i)||n))}}),this.setCache("surfaceIntegralElements",e)},area:function(){if(this.isTriangle()){var e=this.vertices.first,t=e.next,n=t.next;return e=e.data.elements,t=t.data.elements,n=n.data.elements,.5*Sylvester.Vector.create([(e[1]-t[1])*(n[2]-t[2])-(e[2]-t[2])*(n[1]-t[1]),(e[2]-t[2])*(n[0]-t[0])-(e[0]-t[0])*(n[2]-t[2]),(e[0]-t[0])*(n[1]-t[1])-(e[1]-t[1])*(n[0]-t[0])]).modulus()}for(var r=this.trianglesForSurfaceIntegral(),s=0,i=r.length;i--;)s+=r[i].area()*r[i].plane.normal.dot(this.plane.normal);return s},centroid:function(){if(this.isTriangle()){var e=this.v(1).elements,t=this.v(2).elements,n=this.v(3).elements;return Sylvester.Vector.create([(e[0]+t[0]+n[0])/3,(e[1]+t[1]+n[1])/3,(e[2]+t[2]+n[2])/3])}for(var e,r,n,s=0,i=Sylvester.Vector.Zero(3),l=this.trianglesForSurfaceIntegral(),a=l.length;a--;)e=l[a].area()*l[a].plane.normal.dot(this.plane.normal),s+=e,r=i.elements,n=l[a].centroid().elements,i.setElements([r[0]+n[0]*e,r[1]+n[1]*e,r[2]+n[2]*e]);return i.x(1/s)},projectionOn:function(e){var t=[];return this.vertices.each(function(n){t.push(e.pointClosestTo(n.data))}),Sylvester.Polygon.create(t)},removeVertex:function(e){if(!this.isTriangle()){var t=this.nodeFor(e);if(null===t)return null;this.clearCache();var n=t.prev,r=t.next,s=n.data.isConvex(this),i=r.data.isConvex(this);return t.data.isConvex(this)?this.convexVertices.remove(this.convexVertices.withData(t.data)):this.reflexVertices.remove(this.reflexVertices.withData(t.data)),this.vertices.remove(t),s!==n.data.isConvex(this)&&(s?(this.convexVertices.remove(this.convexVertices.withData(n.data)),this.reflexVertices.append(new Sylvester.LinkedList.Node(n.data))):(this.reflexVertices.remove(this.reflexVertices.withData(n.data)),this.convexVertices.append(new Sylvester.LinkedList.Node(n.data)))),i!==r.data.isConvex(this)&&(i?(this.convexVertices.remove(this.convexVertices.withData(r.data)),this.reflexVertices.append(new Sylvester.LinkedList.Node(r.data))):(this.reflexVertices.remove(this.reflexVertices.withData(r.data)),
this.convexVertices.append(new Sylvester.LinkedList.Node(r.data)))),this}},contains:function(e){return this.containsByWindingNumber(e)},containsByWindingNumber:function(e){var t=e.elements||e;if(!this.plane.contains(t))return!1;if(this.hasEdgeContaining(t))return!1;var n,r,s,i,l,a=0,o=0,h=this;return this.vertices.each(function(e){n=e.data.elements,r=e.next.data.elements,s=Sylvester.Vector.create([n[0]-t[0],n[1]-t[1],n[2]-(t[2]||0)]),i=Sylvester.Vector.create([r[0]-t[0],r[1]-t[1],r[2]-(t[2]||0)]),l=s.angleFrom(i),null!==l&&0!==l&&(a+=(s.cross(i).isParallelTo(h.plane.normal)?1:-1)*l,a>=2*Math.PI-Sylvester.precision&&(o++,a-=2*Math.PI),a<=-2*Math.PI+Sylvester.precision&&(o--,a+=2*Math.PI))}),0!==o},hasEdgeContaining:function(e){var t=e.elements||e,n=!1;return this.vertices.each(function(e){Sylvester.Line.Segment.create(e.data,e.next.data).contains(t)&&(n=!0)}),n},toTriangles:function(){return null!==this.cached.triangles?this.cached.triangles:this.setCache("triangles",this.triangulateByEarClipping())},triangulateByEarClipping:function(){for(var e,t,n,r,s=this.dup(),i=[];!s.isTriangle();){for(e=!1;!e;)e=!0,t=s.convexVertices.randomNode(),n=s.vertices.withData(t.data),r=Sylvester.Polygon.create([n.data,n.next.data,n.prev.data],this.plane),s.reflexVertices.each(function(t){t.data!==n.prev.data&&t.data!==n.next.data&&(r.contains(t.data)||r.hasEdgeContaining(t.data))&&(e=!1)});i.push(r),s.removeVertex(n.data)}return i.push(Sylvester.Polygon.create(s.vertices,this.plane)),i},setVertices:function(e,t){var n=e.toArray?e.toArray():e;if(this.plane=t&&t.normal?t.dup():Sylvester.Plane.fromPoints(n),null===this.plane)return null;this.vertices=new Sylvester.LinkedList.Circular;for(var r,s=n.length;s--;)r=n[s].isConvex?n[s]:new Sylvester.Polygon.Vertex(n[s]),this.vertices.prepend(new Sylvester.LinkedList.Node(r));return this.clearCache(),this.populateVertexTypeLists(),this},populateVertexTypeLists:function(){this.convexVertices=new Sylvester.LinkedList.Circular,this.reflexVertices=new Sylvester.LinkedList.Circular;var e=this;this.vertices.each(function(t){e[t.data.type(e)+"Vertices"].append(new Sylvester.LinkedList.Node(t.data))})},copyVertices:function(){this.clearCache(),this.vertices.each(function(e){e.data=new Sylvester.Polygon.Vertex(e.data)}),this.populateVertexTypeLists()},clearCache:function(){this.cached={triangles:null,surfaceIntegralElements:null}},setCache:function(e,t){return this.cached[e]=t,t},inspect:function(){var e=[];return this.vertices.each(function(t){e.push(t.data.inspect())}),e.join(" -> ")}},Sylvester.Polygon.create=function(e,t){var n=new Sylvester.Polygon;return n.setVertices(e,t)},Sylvester.Polygon.Vertex=function(e){return this.setElements(e),2===this.elements.length&&this.elements.push(0),3!==this.elements.length?null:void 0},Sylvester.Polygon.Vertex.prototype=new Sylvester.Vector,Sylvester.Polygon.Vertex.prototype.isConvex=function(e){var t=e.nodeFor(this);if(null===t)return null;var n=t.prev.data,r=t.next.data,s=r.subtract(this),i=n.subtract(this),l=s.angleFrom(i);return l<=Sylvester.precision?!0:Math.abs(l-Math.PI)<=Sylvester.precision?!1:s.cross(i).dot(e.plane.normal)>0},Sylvester.Polygon.Vertex.prototype.isReflex=function(e){var t=this.isConvex(e);return null===t?null:!t},Sylvester.Polygon.Vertex.prototype.type=function(e){var t=this.isConvex(e);return null===t?null:t?"convex":"reflex"},Sylvester.Polygon.Vertex.convert=function(e){for(var t=e.toArray?e.toArray():e,n=[],r=t.length,s=0;r>s;s++)n.push(new Sylvester.Polygon.Vertex(t[s]));return n},Sylvester.LinkedList=function(){},Sylvester.LinkedList.prototype={length:0,first:null,last:null,forEach:function(e,t){for(var n=this.first,r=this.length,s=0;r>s;s++)e.call(t,n,s),n=n.next},at:function(e){if(!(e>=0&&e<this.length))return null;for(var t=this.first;e--;)t=t.next;return t},randomNode:function(){var e=Math.floor(Math.random()*this.length);return this.at(e)},toArray:function(){for(var e=[],t=this.first,n=this.length;n--;)e.push(t.data||t),t=t.next;return e}},Sylvester.LinkedList.prototype.each=Sylvester.LinkedList.prototype.forEach,Sylvester.LinkedList.Node=function(e){this.prev=null,this.next=null,this.data=e},Sylvester.LinkedList.Circular=function(){},Sylvester.LinkedList.Circular.Methods={append:function(e){null===this.first?(e.prev=e,e.next=e,this.first=e,this.last=e):(e.prev=this.last,e.next=this.first,this.first.prev=e,this.last.next=e,this.last=e),this.length++},prepend:function(e){return null===this.first?void this.append(e):(e.prev=this.last,e.next=this.first,this.first.prev=e,this.last.next=e,this.first=e,void this.length++)},insertAfter:function(e,t){t.prev=e,t.next=e.next,e.next.prev=t,e.next=t,t.prev===this.last&&(this.last=t),this.length++},insertBefore:function(e,t){t.prev=e.prev,t.next=e,e.prev.next=t,e.prev=t,t.next===this.first&&(this.first=t),this.length++},remove:function(e){this.length>1?(e.prev.next=e.next,e.next.prev=e.prev,e===this.first&&(this.first=e.next),e===this.last&&(this.last=e.prev)):(this.first=null,this.last=null),e.prev=null,e.next=null,this.length--},withData:function(e){for(var t=this.first,n=this.last,r=Math.ceil(this.length/2);r--;){if(t.data===e)return t;if(n.data===e)return n;t=t.next,n=n.prev}return null}},Sylvester.LinkedList.Circular.prototype=new Sylvester.LinkedList;for(var method in Sylvester.LinkedList.Circular.Methods)Sylvester.LinkedList.Circular.prototype[method]=Sylvester.LinkedList.Circular.Methods[method];Sylvester.LinkedList.Circular.fromArray=function(e,t){for(var n=new Sylvester.LinkedList.Circular,r=e.length;r--;)n.prepend(t?new Sylvester.LinkedList.Node(e[r]):e[r]);return n},function(){var e="function"==typeof require&&"object"==typeof exports?exports:this;e.Line=Sylvester.Line,e.Matrix=Sylvester.Matrix,e.Plane=Sylvester.Plane,e.Polygon=Sylvester.Polygon,e.Vector=Sylvester.Vector,"undefined"!=typeof WScript&&(this.Sylvester=Sylvester)}();
//# sourceMappingURL=sylvester-min.js.map