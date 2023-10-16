INSERT INTO public.tbl_field_config (id, table_name, field_name, submission_required, custom_field, custom_field_type, community_required, group_required, school_required, solo_required) VALUES
(2, 'FestivalClasses', 'selections', true, false, NULL, true, true, true, true),
(3, 'FestivalClasses', 'classNumber', true, false, NULL, false, false, false, false),
(8, 'FestivalClasses', 'numberOfSelections', true, false, NULL, false, false, false, false),
(4, 'FestivalClasses', 'discipline', true, false, NULL, true, true, true, true),
(5, 'FestivalClasses', 'subdiscipline', true, false, NULL, true, true, true, true),
(6, 'FestivalClasses', 'level', true, false, NULL, true, true, true, true),
(7, 'FestivalClasses', 'category', true, false, NULL, true, true, true, true),
(95, 'Community', 'name', true, false, NULL, true, false, false, false),
(96, 'Community', 'chaperones', true, false, NULL, true, false, false, false),
(97, 'Community', 'wheelchairs', true, false, NULL, true, false, false, false),
(102, 'Community', 'groupSize', true, false, NULL, true, false, false, false),
(107, 'SchoolGroup', 'name', true, false, NULL, false, false, true, false),
(108, 'SchoolGroup', 'chaperones', true, false, NULL, false, false, true, false),
(109, 'SchoolGroup', 'wheelchairs', true, false, NULL, false, false, true, false),
(110, 'SchoolGroup', 'unavailable', false, false, NULL, false, false, true, false),
(112, 'SchoolGroup', 'earliestTime', true, false, NULL, false, false, true, false),
(113, 'SchoolGroup', 'latestTime', true, false, NULL, false, false, true, false),
(114, 'SchoolGroup', 'groupSize', true, false, NULL, false, false, true, false),
(67, 'Teacher', 'streetNumber', true, false, NULL, true, true, false, true),
(68, 'Teacher', 'streetName', true, false, NULL, true, true, false, true),
(54, 'Selection', 'title', true, false, NULL, true, true, true, true),
(57, 'Selection', 'composer', true, false, NULL, true, true, true, true),
(58, 'Selection', 'duration', true, false, NULL, true, true, true, true),
(69, 'Teacher', 'city', true, false, NULL, true, true, false, true),
(70, 'Teacher', 'province', true, false, NULL, true, true, false, true),
(71, 'Teacher', 'postalCode', true, false, NULL, true, true, false, true),
(98, 'Community', 'unavailable', false, false, NULL, true, false, false, false),
(64, 'Teacher', 'lastName', true, false, NULL, true, true, true, true),
(65, 'Teacher', 'firstName', true, false, NULL, true, true, true, true),
(72, 'Teacher', 'phone', true, false, NULL, true, true, true, true),
(73, 'Teacher', 'email', true, false, NULL, true, true, true, true),
(111, 'SchoolGroup', 'conflictPerformers', false, false, NULL, false, false, false, false),
(83, 'Registration', 'userID', true, false, NULL, true, true, true, true),
(84, 'Registration', 'label', true, false, NULL, true, true, true, true),
(85, 'Registration', 'performerType', true, false, NULL, true, true, true, true),
(86, 'Registration', 'submittedAt', false, false, NULL, true, true, true, true),
(87, 'Registration', 'totalAmt', false, false, NULL, true, true, true, true),
(88, 'Registration', 'payedAmt', false, false, NULL, true, true, true, true),
(89, 'Registration', 'transactionInfo', false, false, NULL, true, true, true, true),
(90, 'Registration', 'confirmation', false, false, NULL, true, true, true, true),
(24, 'Performer', 'lastName', true, false, NULL, false, true, false, true),
(25, 'Performer', 'firstName', true, false, NULL, false, true, false, true),
(27, 'Performer', 'streetNumber', true, false, NULL, false, true, false, true),
(28, 'Performer', 'streetName', true, false, NULL, false, true, false, true),
(29, 'Performer', 'city', true, false, NULL, false, true, false, true),
(30, 'Performer', 'province', true, false, NULL, false, true, false, true),
(31, 'Performer', 'postalCode', true, false, NULL, false, true, false, true),
(32, 'Performer', 'phone', true, false, NULL, false, true, false, true),
(33, 'Performer', 'email', true, false, NULL, false, true, false, true),
(34, 'Performer', 'age', true, false, NULL, false, true, false, true),
(42, 'School', 'name', true, false, NULL, false, false, true, false),
(43, 'School', 'division', true, false, NULL, false, false, true, false),
(44, 'School', 'streetNumber', true, false, NULL, false, false, true, false),
(45, 'School', 'streetName', true, false, NULL, false, false, true, false),
(46, 'School', 'city', true, false, NULL, false, false, true, false),
(47, 'School', 'province', true, false, NULL, false, false, true, false),
(48, 'School', 'postalCode', true, false, NULL, false, false, true, false),
(49, 'School', 'phone', true, false, NULL, false, false, true, false),
(17, 'Group', 'numberOfPerformers', true, false, NULL, false, false, false, false),
(16, 'Group', 'groupType', true, false, NULL, false, true, false, false),
(18, 'Group', 'age', true, false, NULL, false, true, false, false),
(19, 'Group', 'instruments', true, false, NULL, false, true, false, false),
(15, 'Group', 'name', true, false, NULL, false, true, false, false),
(26, 'Performer', 'apartment', false, false, NULL, false, false, false, false),
(35, 'Performer', 'instrument', true, false, NULL, false, true, false, false),
(36, 'Performer', 'level', true, false, NULL, false, true, false, false),
(37, 'Performer', 'otherClasses', false, false, NULL, false, true, false, false),
(77, 'Unavailable', 'groupID', true, false, NULL, true, true, true, false),
(78, 'Unavailable', 'date', true, false, NULL, true, true, true, false),
(79, 'Unavailable', 'time', true, false, NULL, true, true, true, false),
(1, 'Teacher', 'instrument', true, false, NULL, false, true, false, true),
(9, 'FestivalClasses', 'schoolGroupID', false, false, NULL, false, false, true, false),
(10, 'FestivalClasses', 'price', false, false, NULL, false, false, false, false),
(55, 'Selection', 'largerWork', false, false, NULL, false, false, false, false),
(56, 'Selection', 'movement', false, false, NULL, false, false, false, false),
(66, 'Teacher', 'apartment', false, false, NULL, false, false, false, false),
(99, 'Community', 'conflictPerformers', false, false, NULL, false, false, false, false),
(100, 'Community', 'earliestTime', true, false, NULL, true, false, false, false),
(101, 'Community', 'latestTime', true, false, NULL, true, false, false, false);