import CanvasDrawer from './graph_canvas';
import _ from 'lodash';
import { Particles, Particle } from '../../types';

export default class ParticleEngine {
  drawer: CanvasDrawer;

  maxVolume = 800;

  spawnInterval: NodeJS.Timeout;

  animating: boolean;

  constructor(canvasDrawer: CanvasDrawer) {
    this.drawer = canvasDrawer;
    this.animating = false;
  }

  start() {
    this.animating = true;
    if (!this.spawnInterval) {
      const that = this;
      this.spawnInterval = setInterval(() => that.animate(), 60);
    }
  }

  stop() {
    this.animating = false;
  }

  animate() {
    const that = this;
    if (!that.animating) {
      if (!this.hasParticles()) {
        clearInterval(this.spawnInterval);
        this.spawnInterval = null;
      }
    } else {
      that._spawnParticles();
    }
    that.drawer.repaint();
  }

  hasParticles() {
    for (const edge of this.drawer.cytoscape.edges().toArray()) {
      if (
        edge.data('particles') !== undefined &&
        (edge.data('particles').normal.length > 0 || edge.data('particles').danger.length > 0)
      ) {
        return true;
      }
    }
    return false;
  }

  _spawnParticles() {
    const cy = this.drawer.cytoscape;

    const now = Date.now();
    const delayInMs = 500; // Set the delay in milliseconds (e.g., 500ms)
    const lastSpawnTimeKey = 'lastSpawnTime'; // Key to store the last spawn time for each edge

    cy.edges().forEach((edge) => {
      let particles: Particles = edge.data('particles');

      if (particles === undefined) {
        particles = {
          normal: [],
          danger: [],
        };
        edge.data('particles', particles);
      }

      // Get the last spawn time for this edge
      const lastSpawnTime = edge.data(lastSpawnTimeKey) || 0;

      // Check if enough time has passed since the last spawn
      if (now - lastSpawnTime >= delayInMs) {
        edge.data(lastSpawnTimeKey, now); // Update the last spawn time

        const spawnRate = Math.ceil((100 / this.maxVolume) * 0.1); // Adjust spawn rate
        const constantVelocity = 0.1; // Set a constant velocity for all particles

        for (let i = 0; i < spawnRate; i++) {
          const particle: Particle = {
            velocity: constantVelocity, // Assign the constant velocity
            startTime: now,
          };
            particles.normal.push(particle);
        }
      }
    });
  }

  count() {
    const cy = this.drawer.cytoscape;

    const count = _(cy.edges())
      .map((edge) => edge.data('particles'))
      .filter()
      .map((particleArray) => particleArray.normal.length + particleArray.danger.length)
      .sum();

    return count;
  }
}
