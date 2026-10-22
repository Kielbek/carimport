package com.carimport.geo;

import java.util.List;

/** Free-text address search. */
public interface Geocoder {

    List<Place> search(String query, String language, int limit);
}
