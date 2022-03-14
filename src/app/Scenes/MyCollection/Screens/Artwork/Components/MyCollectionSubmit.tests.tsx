import { fireEvent } from "@testing-library/react-native"
import { navigate } from "app/navigation/navigate"
import { __globalStoreTestUtils__, GlobalStore } from "app/store/GlobalStore"
import { flushPromiseQueue } from "app/tests/flushPromiseQueue"
import { mockEnvironmentPayload } from "app/tests/mockEnvironmentPayload"
import { renderWithHookWrappersTL } from "app/tests/renderWithWrappers"
import React from "react"
import { act } from "react-test-renderer"
import { createMockEnvironment } from "relay-test-utils"
import { MyCollectionArtworkQueryRenderer } from "../MyCollectionArtwork"

jest.unmock("react-relay")

describe("My Collection Artwork", () => {
  let mockEnvironment: ReturnType<typeof createMockEnvironment>

  beforeEach(() => {
    mockEnvironment = createMockEnvironment()
    GlobalStore.actions.artworkSubmission.submission.updateArtworkDetailsForm = jest.fn() as any
    __globalStoreTestUtils__?.injectFeatureFlags({ AREnableNewMyCollectionArtwork: true })
  })

  it("Populates submission form", async () => {
    const { getByTestId } = renderWithHookWrappersTL(
      <MyCollectionArtworkQueryRenderer
        artworkSlug="random-slug"
        artistInternalID="internal-id"
        medium="medium"
      />,
      mockEnvironment
    )

    mockEnvironmentPayload(mockEnvironment, { Artwork: () => mockArtwork })

    await flushPromiseQueue()
    const submitButton = getByTestId("SellArtworkButton")

    act(() => fireEvent.press(submitButton))

    expect(navigate).toHaveBeenCalledWith("/collections/my-collection/artworks/new/submissions/new")

    expect(
      GlobalStore.actions.artworkSubmission.submission.updateArtworkDetailsForm
    ).toHaveBeenCalledWith({
      artist: "Banksy",
      artistId: "4dd1584de0091e000100207c",
      attributionClass: "UNIQUE",
      depth: "13",
      dimensionsMetric: "cm",
      editionNumber: "",
      editionSizeFormatted: "",
      height: "12",
      medium: "Photography",
      provenance: "The Provenance",
      title: "Welcome Mat",
      width: "13",
      year: "2019",
    })
  })
})

const mockArtwork = {
  internalID: "61ee9a54503019000d761232",
  slug: "61ee9a54503019000d761232",
  title: "Welcome Mat",
  date: "2019",
  medium: "Photography",
  artist: {
    internalID: "4dd1584de0091e000100207c",
    name: "Banksy",
  },
  attributionClass: {
    name: "Unique",
  },
  editionNumber: null,
  editionSize: null,
  metric: "cm",
  height: "12",
  width: "13",
  depth: "13",
  provenance: "The Provenance",
  artworkLocation: "Berlin",
}
