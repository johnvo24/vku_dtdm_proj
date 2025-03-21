export enum TargetMuscle {
    Abductors = 'Abductors',
    Abs = 'Abs',
    Adductors = 'Adductors',
    Biceps = 'Biceps',
    Calves = 'Calves',
    Chest = 'Chest',
    Forearms = 'Forearms',
    Glutes = 'Glutes',
    Hamstrings = 'Hamstrings',
    HipFlexors = 'Hip Flexors',
    ITBand = 'IT Band',
    Lats = 'Lats',
    LowerBack = 'Lower Back',
    UpperBack = 'Upper Back',
    Neck = 'Neck',
    Obliques = 'Obliques',
    PalmarFascia = 'Palmar Fascia',
    PlantarFascia = 'Plantar Fascia',
    Quads = 'Quads',
    Shoulders = 'Shoulders',
    Traps = 'Traps',
    Triceps = 'Triceps',
}

export enum ExerciseType {
    Aerobic = 'Aerobic',
    Strength = 'Strength',
    Stretching = 'Stretching',
    Balance = 'Balance',
    Warmup = 'Warmup',
    SMR ='SMR',
    FoamRoll ='FoamRoll',
    Activation= 'Activation',
    Plyometrics ='Plyometrics'
}

export enum ExperienceLevel {
    Beginner ,
    Intermediate ,
    Advanced 
}

export enum ForceType {
    Pull = 'Pull',
    Static = 'Static',
    Isometric = 'Isometric',
    Push = 'Push',
    DynamicStretching = 'Dynamic Stretching',
    Compression = 'Compression',
    NA = 'N/A',
    Hinge = 'Hinge'
}

export enum EquipmentRequired {
    Dumbbell = 'Dumbbell',
    Barbell = 'Barbell',
    Bands = 'Bands',
    Bodyweight = 'Bodyweight',
    Bench = 'Bench',
    Cable = 'Cable',
    Machine = 'Machine',
    Other = 'Other',
    JumpRope = 'Jump Rope',
    ExerciseBall = 'Exercise Ball',
    EZBar = 'EZ Bar',
    KettleBells = 'Kettle Bells',
    LacrosseBall = 'Lacrosse Ball',
    FoamRoll = 'Foam Roll',
    TrapBar = 'Trap Bar',
    Valslide = 'Valslide',
    Rings ='Rings',
    MedicineBall = 'Medicine Ball',
    TigerTail ='Tiger Tail',
    Landmine ='Landmine'
}

export enum Mechanic {
    Compound = 'Compound',
    Isolation = 'Isolation'
}

export enum FoodCategory {
    ProteinShake = 'Protein Shake',
    ProteinBar = 'Protein Bar',
    HighProtein = 'High Protein',
    LowCarb = 'Low Carb',
    Snack = 'Snack',
    Vegetarian = 'Vegetarian',
    Breakfast = 'Breakfast',
    Lunch = 'Lunch',
    Dinner = 'Dinner',
    BBQGrill = 'BBQ/Grill'
}

export enum Gender {
    Male = 'Male',
    Female = 'Female',
    Both = 'Both'
}

// export enum FitnessGoal {
//     FatLoss = 'FatLoss',
//     MuscleBuilding = 'MuscleBuilding',
//     IncreaseStrength = 'IncreaseStrength',
//     SportsPerformance = 'SportsPerformance',
//     BodyWeight = 'BodyWeight',
//     Cardio ='Cardio'
// }
export enum FitnessGoal {
    MuscleBuilding,       // 0
    FatLoss,              // 1
    StrengthTraining,     // 2
    CardioEndurance,      // 3
    SportsPerformance,    // 4
    Bodyweight,             //5
    FullBody,     // 6
    AbCoreWorkouts,       // 7
    AtHomeWorkouts,        // 8
    Cardio //9
  }

export enum DayOfWeek {
    Monday,
    Wednesday ,
    Tuesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
}

export enum WorkoutCategory {
    ForMen = 'For Men',
    ForWomen = 'For Women',
    MuscleBuilding = 'Muscle Building',
    FatLoss = 'Fat Loss',
    IncreaseStrength = 'Increase Strength',
    AbWorkouts = 'Ab Workouts',
    FullBody = 'Full Body',
    SportsPerformance = 'Sports Performance',
    Bodyweight = 'Bodyweight',
    Beginner = 'Beginner',
    AtHome = 'At Home',
    Celebrity = 'Celebrity',
    Cardio = 'Cardio',
    ChestWorkouts = 'Chest Workouts',
    BackWorkouts = 'Back Workouts',
    BicepWorkouts = 'Bicep Workouts',
    ShoulderWorkouts = 'Shoulder Workouts',
    LegWorkouts = 'Leg Workouts',
    TricepWorkouts = 'Tricep Workouts',
    GluteWorkouts = 'Glute Workouts'
}

export enum WorkoutType {
    Split = 'Split',
    FullBody = 'Full Body'
}
