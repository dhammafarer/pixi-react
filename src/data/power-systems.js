import powerSystem from '../lib/power-system.js';

export const fushanMicrogrid = powerSystem({
  name: 'Fushan Microgrid',
  components: [
    {name: 'Diesel Generator', type: 'generator', data: {}},
    {name: 'PV Solar', type: 'generator', data: {}},
    {name: 'House', type: 'consumer', data: {}}]
});
