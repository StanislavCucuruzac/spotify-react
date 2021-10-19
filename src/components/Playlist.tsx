import React, { useState } from "react";
import { useParams } from "react-router";

type Params = {
    id: string
}

export const PlaylistPage = () => {

    const { id } = useParams<Params>();

    return (
        <div>
            <div className="playlistPage">
                <span>this is a indivudual playlist {id}</span>
            </div>
        </div>
    );
};