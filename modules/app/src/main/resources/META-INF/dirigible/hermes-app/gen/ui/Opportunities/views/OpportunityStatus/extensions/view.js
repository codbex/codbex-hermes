/*
 * Copyright (c) 2010-2020 SAP and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v2.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v20.html
 * Contributors:
 * SAP - initial API and implementation
 */

exports.getView = function(relativePath) {
	return {
		id: "OpportunityStatus",
		name: "OpportunityStatus",
		label: "OpportunityStatus",
		order: 100,
		factory: "frame",
		// region: "center-bottom",
		link: relativePath + "services/v4/web/hermes-app/gen/ui/Opportunities/views/OpportunityStatus/index.html"
	};
};
