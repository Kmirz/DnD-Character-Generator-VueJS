<template>
  <aside :class="[is_expanded ? 'is-expanded' : '']">
    <div class="logo">
      <img src="../assets/logo.png" alt="Vue Logo" />
    </div>
    <div class="menu-toggle-wrap">
      <button class="menu-toggle" @click="ToggleMenu">
        <span class="material-icons material-icons-round"> double_arrow </span>
      </button>
    </div>

    <h3>Menu</h3>
    <div class="menu">
      <router-link class="button" to="/">
        <span class="material-icons material-icons-round"> home </span>
        <span class="text">Home</span>
      </router-link>
      <router-link class="button" to="/about">
        <span class="material-icons material-icons-round"> help_outline </span>
        <span class="text">About</span>
      </router-link>
    </div>
    <div class="settings"></div>
    <div class="menu">
      <router-link class="button" to="/settings">
        <span class="material-icons material-icons-round"> settings </span>
        <span class="text">Settings</span>
      </router-link>
    </div>
  </aside>
</template>

<script setup>
import { ref } from "vue";
const is_expanded = ref(false);

const ToggleMenu = () => {
  is_expanded.value = !is_expanded.value;
};
</script>

<style lang="scss" scoped>
aside {
  display: flex;
  flex-direction: column;
  width: calc(2rem + 2rem);
  min-height: 100vh;
  overflow: hidden;
  padding: 1rem;

  background-color: var(--dark);
  color: var(--light);

  transition: 0.2s ease-out;
  .settings {
    flex: 1 1 0;
  }
  .logo {
    margin-bottom: 1rem;
    img {
      width: 2rem;
    }
  }

  .menu-toggle-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: -1rem;
    position: relative;

    top: 0;
    transition: 0.2s ease-out;

    .menu-toggle {
      margin-left: -100px;
      transition: 0.2s ease-out;
      .material-icons-round {
        font-size: 2rem;
        color: var(--light);
      }
    }

    .menu-toggle:hover {
      .material-icons-round {
        transform: scale(1.2);
        color: var(--primary);
      }
    }
  }

  @media (max-width: 768px) {
    position: fixed;
    z-index: 99;
  }
}

h3,
.button .text {
  opacity: 0;
  transition: 0.3s ease-in-out;
}

.menu {
  margin: 0 -1rem;
  .button {
    display: flex;
    align-items: center;
    text-decoration: none;
    transition: 0.2s ease-in-out;
    padding: 0.5rem 1rem;
    .material-icons {
      font-size: 2rem;
      color: var(--light);
      transition: 0.2s ease-in-out;
    }
    .text {
      color: var(--light);
      transition: 0.2s ease-in-out;
    }
    &:hover {
      background-color: var(--dark-alt);
      .material-icons,
      .text {
        color: var(--primary);
      }
    }
    &.router-link-exact-active {
      background-color: var(--dark-alt);
      border-right: 5px solid var(--primary);
      .material-icons,
      .text {
        color: var(--primary);
      }
    }
  }
}

h3 {
  color: var(--grey);
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.is-expanded {
  width: var(--sidebar-width);

  .menu-toggle-wrap {
    top: -3.5rem;
    .menu-toggle {
      transform: rotate(180deg);
    }
  }

  h3,
  .button .text {
    opacity: 1;
  }

  .button {
    .material-icons {
      margin-right: 1rem;
    }
  }
}
</style>