var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
    rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    








    var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};



 var htmlPrefilter = function( html ) {
    return html.replace( rxhtmlTag, "<$1></$2>" );
}


var empty= function() {
    var elem,
        i = 0;

    for ( ; ( elem = this[ i ] ) != null; i++ ) {
        if ( elem.nodeType === 1 ) {

            // Prevent memory leaks
            jQuery.cleanData( getAll( elem, false ) );

            // Remove any remaining nodes
            elem.textContent = "";
        }
    }

    return this;
}


var append = function() {
    return domManip( this, arguments, function( elem ) {
        if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
            var target = manipulationTarget( this, elem );
            target.appendChild( elem );
        }
    } );
},

let jq = {
    
    
    
    html: function( value ) {
    return access( this, function( value ) {
        var elem = this[ 0 ] || {},
            i = 0,
            l = this.length;

        if ( value === undefined && elem.nodeType === 1 ) {
            return elem.innerHTML;
        }

        // See if we can take a shortcut and just use innerHTML
        if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
            !wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

            value = jQuery.htmlPrefilter( value );

            try {
                for ( ; i < l; i++ ) {
                    elem = this[ i ] || {};

                    // Remove element nodes and prevent memory leaks
                   /* if ( elem.nodeType === 1 ) {
                        jQuery.cleanData( getAll( elem, false ) );
                        elem.innerHTML = value;
                    }*/
                }

                elem = 0;

            // If using innerHTML throws an exception, use the fallback method
            } catch ( e ) {}
        }

        if ( elem ) {
            this.empty().append( value );
        }
    }, null, value, arguments.length );
},



}