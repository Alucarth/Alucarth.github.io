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
            <i class="ki-outline ki-burger-menu" aria-hidden="true"></i>
          </button>
          <div class="title">David <span> TOrrez</span></div>
        </div>
        <ul>
          <li><input type="text" class="form-control" aria-label="Buscar"></li>
          <li><a href="#" aria-label="Buscar"><i class="ki-outline ki-magnifier" aria-hidden="true"></i></a></li>
          <li><a href="#" aria-label="Notificaciones"><i class="ki-outline ki-notification" aria-hidden="true"></i></a></li>
          <li><a href="#" aria-label="Cerrar sesión"><i class="ki-outline ki-exit-right" aria-hidden="true"></i></a></li>
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
              <i class="ki-outline ki-element-11" aria-hidden="true"></i><span>Dashboard</span>
            </a>
          </li>
          <li class="item" :class="{ 'is-open': openMenu === 'profile' }">
            <button
              class="menu-btn"
              type="button"
              aria-label="Profile"
              :aria-expanded="openMenu === 'profile'"
              aria-controls="profile-submenu"
              @click="toggleMenu('profile')"
            >
              <i class="ki-outline ki-profile-circle" aria-hidden="true"></i>
              <span>Profile</span>
              <i class="ki-outline ki-arrow-right drop-down" aria-hidden="true"></i>
            </button>
            <div id="profile-submenu" class="sub-menu" :inert="openMenu !== 'profile'">
              <a href="#"><i class="ki-outline ki-picture" aria-hidden="true"></i><span>Picture</span></a>
              <a href="#"><i class="ki-outline ki-address-book" aria-hidden="true"></i><span>Info</span></a>
            </div>
          </li>
          <li class="item" :class="{ 'is-open': openMenu === 'messages' }">
            <button
              class="menu-btn"
              type="button"
              aria-label="Messages"
              :aria-expanded="openMenu === 'messages'"
              aria-controls="messages-submenu"
              @click="toggleMenu('messages')"
            >
              <i class="ki-outline ki-messages" aria-hidden="true"></i>
              <span>Messages</span>
              <i class="ki-outline ki-arrow-right drop-down" aria-hidden="true"></i>
            </button>
            <div id="messages-submenu" class="sub-menu" :inert="openMenu !== 'messages'">
              <a href="#"><i class="ki-outline ki-message-add" aria-hidden="true"></i><span>New</span></a>
              <a href="#"><i class="ki-outline ki-message-text" aria-hidden="true"></i><span>Sent</span></a>
              <a href="#"><i class="ki-outline ki-information-2" aria-hidden="true"></i><span>Spam</span></a>
            </div>
          </li>
          <li class="item" :class="{ 'is-open': openMenu === 'settings' }">
            <button
              class="menu-btn"
              type="button"
              aria-label="Settings"
              :aria-expanded="openMenu === 'settings'"
              aria-controls="settings-submenu"
              @click="toggleMenu('settings')"
            >
              <i class="ki-outline ki-setting-2" aria-hidden="true"></i>
              <span>Settings</span>
              <i class="ki-outline ki-arrow-right drop-down" aria-hidden="true"></i>
            </button>
            <div id="settings-submenu" class="sub-menu" :inert="openMenu !== 'settings'">
              <a href="#"><i class="ki-outline ki-lock" aria-hidden="true"></i><span>Password</span></a>
              <a href="#"><i class="ki-outline ki-text" aria-hidden="true"></i><span>Language</span></a>
            </div>
          </li>
          <li class="item">
            <a href="#" class="menu-btn" aria-label="About">
              <i class="ki-outline ki-information-2" aria-hidden="true"></i><span>About</span>
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
    openMenu: null,
  }),
  methods: {
    toggleMenu(menu) {
      this.openMenu = this.openMenu === menu ? null : menu;
    },
  },
  setup() {
    return { profileImage };
  },
};
</script>
