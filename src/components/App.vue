<template>
<div>
  <!-- wrapper start -->
  <div :class="drawer?'wrapper':'wrapper collapse'"  >
    <!-- header menu start -->
    <div class="header">
      <div class="header-menu">
        <div class="header-brand">
          <button
            class="sidebar-btn"
            type="button"
            :aria-label="drawer ? 'Contraer menú' : 'Expandir menú'"
            :aria-expanded="drawer"
            aria-controls="sidebar-navigation"
            @click="drawer = !drawer"
          >
            <i class="fas fa-bars" aria-hidden="true"></i>
          </button>
          <div class="title">David <span> TOrrez</span></div>
        </div>
        <ul>
          <li><input type="text" class="form-control" aria-label="Buscar"></li>
          <li><a href="#" aria-label="Buscar"><i class="fas fa-search" aria-hidden="true"></i></a></li>
          <li><a href="#" aria-label="Notificaciones"><i class="fas fa-bell" aria-hidden="true"></i></a></li>
          <li><a href="#" aria-label="Cerrar sesión"><i class="fas fa-power-off" aria-hidden="true"></i></a></li>
        </ul>
      </div>
    </div>
    <!-- header menu end -->
    <!-- sidebar start -->
    <aside class="sidebar" aria-label="Barra lateral">
      <nav id="sidebar-navigation" class="sidebar-menu" aria-label="Navegación principal">
        <div class="profile">
          <img :src="profileImage" alt="">
          <p>Full Stack Developer</p>
        </div>
        <ul class="sidebar-nav">
          <li class="item">
            <a href="#" class="menu-btn" aria-label="Dashboard">
              <i class="fas fa-dashboard" aria-hidden="true"></i><span>Dashboard</span>
            </a>
          </li>
          <li class="item" id="profile">
            <a href="#profile" class="menu-btn" aria-label="Profile">
              <i class="fas fa-user-circle" aria-hidden="true"></i>
              <span>Profile <i class="fas fa-chevron-down drop-down"></i></span>
            </a>
            <div class="sub-menu">
              <a href="#"><i class="fas fa-image" aria-hidden="true"></i><span>Picture</span></a>
              <a href="#"><i class="fas fa-address-card" aria-hidden="true"></i><span>Info</span></a>
            </div>
          </li>
          <li class="item" id="messages">
            <a href="#messages" class="menu-btn" aria-label="Messages">
              <i class="fas fa-envelope" aria-hidden="true"></i>
              <span>Messages <i class="fas fa-chevron-down drop-down"></i></span>
            </a>
            <div class="sub-menu">
              <a href="#"><i class="fas fa-envelope" aria-hidden="true"></i><span>New</span></a>
              <a href="#"><i class="fas fa-envelope-square" aria-hidden="true"></i><span>Sent</span></a>
              <a href="#"><i class="fas fa-exclamation-circle" aria-hidden="true"></i><span>Spam</span></a>
            </div>
          </li>
          <li class="item" id="settings">
            <a href="#settings" class="menu-btn" aria-label="Settings">
              <i class="fas fa-cog" aria-hidden="true"></i>
              <span>Settings <i class="fas fa-chevron-down drop-down"></i></span>
            </a>
            <div class="sub-menu">
              <a href="#"><i class="fas fa-lock" aria-hidden="true"></i><span>Password</span></a>
              <a href="#"><i class="fas fa-language" aria-hidden="true"></i><span>Language</span></a>
            </div>
          </li>
          <li class="item">
            <a href="#" class="menu-btn" aria-label="About">
              <i class="fas fa-info-circle" aria-hidden="true"></i><span>About</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
    <!-- sidebar end -->
    <!-- main container start -->
    <div class="main-container">

    </div>
    <!-- main container end -->
  </div>
  <!-- wrapper end -->


</div>
</template>

<script>
import profileImage from '../../img/profile.jpg';

export default {
  data: () => ({
    drawer: true,
  }),
  setup() {
    return { profileImage };
  },
};
</script>
