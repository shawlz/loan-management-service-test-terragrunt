import tracer from 'dd-trace';

tracer.init({
  logInjection: true,
  profiling: true,
  appsec: false,
});

export default tracer;
