earthjs.plugins.worldPlugin = function(jsonUrl='./d/world-110m.json') {
    function addWorldOrCountries(planet, options) {
        planet.svg.selectAll('.land,.lakes,.countries').remove();
        if (!options.hideLand) {
            if (planet._world) {
                if (!options.hideCountries) {
                    planet.countries = planet.svg.append("g").attr("class","countries").selectAll("path")
                    .data(topojson.feature(planet._world, planet._world.objects.countries).features)
                    .enter().append("path").attr("d", planet.path);
                } else {
                    planet.world = planet.svg.append("g").attr("class","land").append("path")
                    .datum(topojson.feature(planet._world, planet._world.objects.land))
                    .attr("d", planet.path);
                }
                planet.lakes = planet.svg.append("g").attr("class","lakes").append("path")
                .datum(topojson.feature(planet._world, planet._world.objects.ne_110m_lakes))
                .attr("d", planet.path);
            }
        }
    }

    return {
        name: 'worldPlugin',
        json: jsonUrl,
        ready(planet, options, err, world) {
            planet._world = world;
            planet.recreateSvg(planet);
        },
        onInit(planet, options) {
            options.world = true;
            options.hideLand = false;
            options.hideCountries = false;
            planet.addWorldOrCountries = addWorldOrCountries;
        },
        onRefresh(planet, options) {
            if (!options.hideLand) {
                if (!options.hideCountries) {
                    planet.countries.attr("d", planet.path);
                } else {
                    planet.world.attr("d", planet.path);
                }
                planet.lakes.attr("d", planet.path);
            }
        }
    };
};
