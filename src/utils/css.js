export default `
.LazyLoad img { opacity: 0; }
.LazyLoad.is-loaded img { opacity: 1; }
.LazyLoad {
  position: relative;
  height: 0;
  padding-bottom: 75%;
  overflow: hidden;
}
.LazyLoad iframe,
.LazyLoad object,
.LazyLoad embed,
.LazyLoad video,
.LazyLoad img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}`;
