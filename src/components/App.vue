<template>
<div>
  <!-- wrapper start -->
  <div :class="drawer?'wrapper':'wrapper collapse'"  >
    <!-- header menu start -->
    <div class="header">
      <div class="header-menu">
        <div class="title">David <span> TOrrez</span></div>
        <div class="sidebar-btn" @click="drawer=!drawer">
          <i class="fas fa-bars"></i>
        </div>
        <ul>
          <!-- <li><a href="#"><i class="fas fa-search"></i></a></li>  -->
          <li><a href="#"><i class="fas fa-search"></i></a></li>
           <!-- <li><a href="#"><i class="fas fa-power-off"></i></a></li> -->
        </ul>
      </div>
    </div>
    <!-- header menu end -->
    <!-- sidebar start -->
    <div class="sidebar">
      <div class="sidebar-menu">
        <center class="profile">
          <img src="img/profile.jpg" alt="">
          <p>Full Stack Developer</p>
        </center>
        <li class="item">
          <a href="#" class="menu-btn">
            <i class="fas fa-desktop"></i><span>Dashboard</span>
          </a>
        </li>
        <li class="item" id="profile">
          <a href="#profile" class="menu-btn">
            <i class="fas fa-user-circle"></i><span>Profile <i class="fas fa-chevron-down drop-down"></i></span>
          </a>
          <div class="sub-menu">
            <a href="#"><i class="fas fa-image"></i><span>Picture</span></a>
            <a href="#"><i class="fas fa-address-card"></i><span>Info</span></a>

          </div>
        </li>
        <li class="item" id="messages">
          <a href="#messages" class="menu-btn">
            <i class="fas fa-user-circle"></i><span>Messages <i class="fas fa-chevron-down drop-down"></i></span>
          </a>
          <div class="sub-menu">
            <a href="#"><i class="fas fa-envelope"></i><span>New</span></a>
            <a href="#"><i class="fas fa-envelope-square"></i><span>Sent</span></a>
            <a href="#"><i class="fas fa-exclamation-circle"></i><span>Spam</span></a>

          </div>
        </li>
        <li class="item" id="settings">
          <a href="#settings" class="menu-btn">
            <i class="fas fa-cog"></i><span>Settings <i class="fas fa-chevron-down drop-down"></i></span>
          </a>
          <div class="sub-menu">
            <a href="#"><i class="fas fa-lock"></i><span>Password</span></a>
            <a href="#"><i class="fas fa-language"></i><span>Language</span></a>

          </div>
        </li>
        <li class="item">
          <a href="#" class="menu-btn">
            <i class="fas fa-info-circle"></i><span>About</span>
          </a>
        </li>
      </div>
    </div>
    <!-- sidebar end -->
    <!-- main container start -->
    <div class="main-container"></div>
    <!-- main container end -->
  </div>
  <!-- wrapper end -->


</div>
</template>

<script>
import '../app.css';
// import '../debug.css';

export default {
  props: {
    source: String,
  },
  data: () => ({
    items: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard' },
      { title: 'Photos', icon: 'mdi-image' },
      { title: 'About', icon: 'mdi-help-box' },
    ],
    drawer: true,
  }),
  methods:{
    drawerhide()
    {
      this.drawer =!this.drawer;
    }
  }

};
</script>
