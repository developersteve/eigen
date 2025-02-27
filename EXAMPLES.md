<!-- Template

## What I am trying to do.

Short comment on how we do things and any preferences.

Links:
- [link 1](path/to/file1)
- [link 2](path/to/file2)

-->

👀 See comment on top of file for template.

## I want to write a test.

We use `@testing-library/react-native` and our helper `renderWithWrappersTL`.
We try to use `testID` to find elements.

Links:

- [Dialog.tests.tsx](src/palette/elements/Dialog/Dialog.tests.tsx)

## I want to write a test with relay.

Similar to above. For `relay` testing we use `mockEnvironmentPayload` to mock the most recent operation.
Look at https://github.com/artsy/relay-workshop for a great tutorial of how we use relay and test with it.

Links:

- [Search.tests.tsx](src/app/Scenes/Search/Search.tests.tsx)
- [ArtistSavedSearch.tests.tsx](src/app/Scenes/Artist/ArtistSavedSearch.tests.tsx)7

## I want to add some global state, doesn't need to be persisted.

We use `easy-peasy` for global state, and for non-persisted state we use something called `sessionState`. This can be in any model. If your global state is something small, you could add it in [GlobalStoreModel.ts](src/app/store/GlobalStoreModel.ts) as part of the `sessionState` there, or you could create a new Model like [ToastModel.ts](src/app/store/ToastModel.ts) that only uses non-persisted state, therefore only `sessionState`.

Links:

- [GlobalStoreModel.ts](src/app/store/GlobalStoreModel.ts#L32)
- [ToastModel.ts](src/app/store/ToastModel.ts#L16)

## I want to add some global state, should be persisted.

Similar to above, but if we want to persist, we put our state outside the `sessionState`. If your state fits in one of our existing Models in [lib/store](src/app/store), you can use that. If it's a separate enough thing, then you can add a new Model, the [VisualClueModel.ts](src/app/store/VisualClueModel.ts) is a good example. The state in that model will be persisted.

When changing/adding/removing persisted state, you **must create a migration!** For more info, look for a migration example in this file, and look at the [adding_state_migrations.md](docs/adding_state_migrations.md) docs.

Links:

- [VisualClueModel.ts](src/app/store/VisualClueModel.ts)

## I want to add a migration for changed/added/removed global state.

Global state that is persisted needs migrations when you change/add/remove anything. That's so that the app can do any necessary preparation to the persisted storage then the app is launched, to make sure the app is in a consistent state.

There is documentation in [adding_state_migrations.md](docs/adding_state_migrations.md), but here are the main steps are:

- Add a new version in `Versions` in [migration.ts](src/app/store/migration.ts).
- Change the `CURRENT_APP_VERSION` in [migration.ts](src/app/store/migration.ts).
- Add a migration in `artsyAppMigrations` in [migration.ts](src/app/store/migration.ts).
- Add a test for your migration in [migration.tests.ts](src/app/store/migration.tests.ts) similar to the ones we have in there.

Links:

- [migration.ts](src/app/store/migration.ts).
- [migration.tests.ts](src/app/store/migration.tests.ts)

## I want to add a dev-only tool to the app.

We call these "Dev Toggles", and you can find them in the Dev Menu close to the bottom of the screen.

The code for them is in [features.ts](src/app/store/config/features.ts). Their key starts with `DT` as an homage to the ObjC style of naming things, and the letters specifically stand for "Dev Toggle".

You can easily add a new one, and it will appear in the Dev Menu. Then you can use they in code using `useDevToggle`.

Links:

- [features.ts](src/app/store/config/features.ts).
