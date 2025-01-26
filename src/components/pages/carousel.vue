<template>
    <div class="carousel">
      <div v-for="(image, index) in images" :key="index" class="carousel-item">
        <img :src="image.src" :alt="image.alt" />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        images: [
          { src: "@/assets/images/image1.jpg", alt: "Image 1" },
          { src: "@/assets/images/image2.jpg", alt: "Image 2" },
          { src: "@/assets/images/image3.jpg", alt: "Image 3" },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .carousel {
    display: flex;
    overflow: hidden;
    width: 100%;
  }
  .carousel-item {
    flex: 0 0 100%;
    transition: transform 0.5s ease;
  }
  </style>
  