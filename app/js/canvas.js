const config = {
        nodes: {
          // Number of nodes per 500px of canvas width
          density: 40,
          // Size and randomness in pixels
          size: 1,
          sizeVariation: 0.5,
          nodeOpacity: 0.1,
          // Movement speed and randomness in pixels/sec
          speed: 0.5,
          speedVariation: 0.5,
          // How far away in pixels the nodes will link up
          linkLength: 200,
          // Link width in pixels
          linkOpacity: 0.3
        },
        pulse: {
          // Frequency of random pulses in milliseconds
          frequency: 4000,
          // How large the nodes become when pulsed
          intensity: 5,
          // Speed of pulse in pixels/sec
          speed: 400,
          // Falloff of pulse in milliseconds
          falloff: 2000
        }
      };

      // Set up globals
      const canvas = document.querySelector('#canvas'),
            c = canvas.getContext('2d'),
            pulses = [],
            nodes = [];

      let winX = window.innerWidth,
          winY = window.innerHeight;

      // Initialise the canvas
      window.onload = () => { 
        load();
        // No animations on mobile
        if (window.innerWidth <= 768) { return }

        resizeCanvas()
        // Set frame draw interval to 60fps
        stepCanvas();

        // Pulse random node every X milliseconds
        setInterval(() => { 
          if (canvas.classList.contains('hidden')) { return }
          let randomNode = Math.floor(getRandom(0, nodes.length - 1));
          pulse(nodes[randomNode][0], nodes[randomNode][1]);
          }, config.pulse.frequency
        ); 
      };
      
      window.onresize = () => { 
        resizeCanvas() 
      };

      // Add a node and fire off a pulse when mouse is clicked
      document.addEventListener('click', (e) => {
        let x = e.clientX;
        let y = e.clientY;
        addNodes(1, x, y)
        pulse(x, y)
      });

      // Returns a random number between min and max
      const getRandom = (min, max) => {
        return Math.random() * (max - min) + min;
      };

      // Returns the desired number of nodes for the current screen width
      const getNodeQuantity = () => {
        return Math.floor(winX / 500 * config.nodes.density);
      };

      // Returns the distance between two points with Pythagoras' Theorem 
      const getDistance = (a, b, x, y) => {
        let xDelta = Math.abs(a - x),
            yDelta = Math.abs(b - y);
        return Math.sqrt(xDelta ** 2 + yDelta ** 2);
      }

      const addNodes = (int = 1, x, y) => {
          for (var i = 0; i < int; i++) {
            // Randomise node attributes
            let xPos     = getRandom(1, winX),
                yPos     = getRandom(1, winY),
                xVector  = getRandom(-config.nodes.speed, config.nodes.speed) + 
                           getRandom(-config.nodes.speedVariation, config.nodes.speedVariation), 
                yVector  = getRandom(-config.nodes.speed, config.nodes.speed) + 
                           getRandom(-config.nodes.speedVariation, config.nodes.speedVariation), 
                nodeSize = getRandom(-config.nodes.sizeVariation, config.nodes.sizeVariation) + config.nodes.size;
            // X position, Y position, X vector, Y vector, Node size, Pulse strength
            let node = [x || xPos, y || yPos, xVector, yVector, nodeSize, 1];
            nodes.push(node);
          }
      };

      const resizeCanvas = () => {
        // Save last size so we can calculate the change and adjust the nodes
        let oldWinX = winX,
            oldWinY = winY;
        // Store new size
        winX = window.innerWidth;
        winY = window.innerHeight;
        // Calculate the change as a multiplier
        let winXDelta = winX / oldWinX,
            winYDelta = winY / oldWinY;
        // Adjust each node's position based on new dimensions, so none leave the window
        nodes.forEach((node) => {
          node[0] *= winXDelta;
          node[1] *= winYDelta;
        });
        // Add or remove nodes to maintain desired density
        let desiredNodes = getNodeQuantity();
        if (desiredNodes > nodes.length) {
          addNodes(desiredNodes - nodes.length)
        } else if (desiredNodes < nodes.length) {
          nodes.splice(desiredNodes - 1)
        }
        // Finally resize the canvas
        c.canvas.width = winX;
        c.canvas.height = winY;
      };


      const stepCanvas = () => {
        // Clear the canvas
        c.clearRect(0, 0, canvas.width, canvas.height);
        // Draw frame
        nodes.forEach((node) => {
          // Draw the nodes
          c.beginPath();
          let radius = node[4] * node[5];
          c.arc(node[0], node[1], radius, 0, 360);
          let fillOpacity = node[5] * 3 * config.nodes.nodeOpacity;
          c.fillStyle = 'rgba(225,225,225,' + fillOpacity + ')';
          c.strokeStyle = 'rgba(225,225,225,' + fillOpacity + ')';
          c.fill();
          c.stroke();
          // Search for other close nodes and connect with a line
          nodes.forEach((otherNode) => {
            // Find distance between points            
            var distance = getDistance(node[0], node[1], otherNode[0], otherNode[1]);
            // Link close nodes
            if (distance < config.nodes.linkLength) {
              c.beginPath();
              c.moveTo(node[0], node[1]);
              c.lineTo(otherNode[0], otherNode[1]);
              // Links become stronger based on distance
              let strokeOpacity = config.nodes.linkOpacity - config.nodes.linkOpacity / config.nodes.linkLength * distance;
              // Links become stronger based on pulse strength
              strokeOpacity *= node[5];
              c.strokeStyle = 'rgba(225,225,225,' + strokeOpacity + ')';
              c.lineWidth = 1;
              c.stroke();
            }
          });
        });

        // Apply animation to nodes ready for next frame
        nodes.forEach((node) => {
          // Check if the node should bounce off the canvas edge, if so flip the vector
          if (node[0] + node[2] < 0 || node[0] + node[2] > winX) {
            node[2] = -node[2];
          }
          if (node[1] + node[3] < 0 || node[1] + node[3] > winY) {
            node[3] = -node[3];
          }
          // Apply movement vectors
          node[0] += node[2];
          node[1] += node[3];
          // Apply pulse multipliers
          pulses.forEach((pulse) => {
            var distance = getDistance(node[0], node[1], pulse[0], pulse[1]);
            if (distance < pulse[2]) {
              var intensity = 1 - 1 / distance;
              node[5] = 1 + pulse[3] * config.pulse.intensity
            }
          });
        });

        // Animate pulses
        pulses.forEach((pulse) => {
          // Increase pulse size by speed in pixels/sec divided by framerate
          pulse[2] += config.pulse.speed / 60;
          // Fade the pulse over the falloff duration
          let falloff = 1 / (60 * config.pulse.falloff / 1000);
          if (pulse[3] <= falloff) {
            // Remove from array when falloff is complete
            pulses.unshift()
            return;
          } else {
            // Reduce pulse intensity by falloff rate
            pulse[3] -= falloff;
          }
        });

        // Break infinite loop if canvas is no longer needed
        if (canvas.classList.contains('hidden')) { return }

        // Await next frame for redraw
        window.requestAnimationFrame(stepCanvas);
      };

      const pulse = (x, y) => {
        // Create a new pulse with x, y, size, intensity
        let newPulse = [x, y, 0, 1];        
        pulses.push(newPulse);
      };