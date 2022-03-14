import { ActionType, ContextModule, OwnerType } from "@artsy/cohesion"
import {
  MyCollectionSubmit_artwork,
  MyCollectionSubmit_artwork$key,
} from "__generated__/MyCollectionSubmit_artwork.graphql"
import { navigate } from "app/navigation/navigate"
import { GlobalStore } from "app/store/GlobalStore"
import { getAttributionClassValueByName } from "app/utils/artworkRarityClassifications"
import { Button, Flex } from "palette"
import React from "react"
import { useFragment } from "react-relay"
import { useTracking } from "react-tracking"
import { graphql } from "relay-runtime"

interface MyCollectionSubmitProps {
  artwork: MyCollectionSubmit_artwork$key
}

export const MyCollectionSubmit: React.FC<MyCollectionSubmitProps> = (props) => {
  const { trackEvent } = useTracking()

  const artwork = useFragment<MyCollectionSubmit_artwork$key>(artworkFragment, props.artwork)
  console.log({ daValues: artwork })

  return (
    <Flex>
      <Button
        size="large"
        block
        onPress={() => {
          trackEvent(tracks.tappedShowMore(artwork.internalID, artwork.slug, "Learn More"))
          populateSubmissionArtworkForm(artwork)
          navigate("/collections/my-collection/artworks/new/submissions/new")
        }}
        testID="SellArtworkButton"
      >
        Sell Artwork
      </Button>
    </Flex>
  )
}

const populateSubmissionArtworkForm = (artwork: MyCollectionSubmit_artwork) => {
  GlobalStore.actions.artworkSubmission.submission.updateArtworkDetailsForm({
    artist: artwork.artist?.name ?? "",
    artistId: artwork.artist?.internalID ?? "",
    title: artwork.title ?? "",
    year: artwork.date ?? "",
    medium: artwork.medium ?? "",
    attributionClass: getAttributionClassValueByName(artwork.attributionClass?.name),
    editionNumber: artwork.editionNumber ?? "",
    editionSizeFormatted: artwork.editionSize ?? "",
    dimensionsMetric: artwork.metric ?? "",
    height: artwork.height ?? "",
    width: artwork.width ?? "",
    depth: artwork.depth ?? "",
    provenance: artwork.provenance ?? "",
    sourceArtworkId: artwork.internalID,
  })
}

const artworkFragment = graphql`
  fragment MyCollectionSubmit_artwork on Artwork {
    internalID
    slug
    title
    date
    medium
    artist {
      internalID
      name
    }
    attributionClass {
      name
    }
    editionNumber
    editionSize
    metric
    height
    width
    depth
    provenance
    artworkLocation
  }
`

const tracks = {
  tappedShowMore: (internalID: string, slug: string, subject: string) => ({
    action: ActionType.tappedShowMore,
    context_module: ContextModule.sellFooter,
    context_screen_owner_type: OwnerType.myCollectionArtwork,
    context_screen_owner_id: internalID,
    context_screen_owner_slug: slug,
    subject,
  }),
}
